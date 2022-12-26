import React, { useState, useEffect } from 'react'
import { Polygon } from 'react-leaflet'
import { db } from "../../Firebase/config"
import { ref, set } from "firebase/database";


import CensoPopup from './CensoPopup'

function Censo(props) {
  //Variaveis
  const estiloPadrao = { color: 'black', fillOpacity: 0, weight: 5, opacity: .3 }
  const estiloFeito = { color: 'green', fillOpacity: .5, stroke: true }
  const [ultimavez, setUltimavez] = useState("");
  const [active, setActive] = useState(false);
  var ocioDias = 1000;


  //Salva ultima vez em State
  useEffect(() => {
    setUltimavez(props.ultimavez);
  }, [props.ultimavez])

  //Marcar como feito e atualizar ultima vez
  const marcarFeito = (p) => {
    var hoje = new Date(Date.now()).toLocaleDateString("en-GB")
    const ultimavezRef = ref(db, 'feitos/censo/ultimaVez/' + p.dados.codIBGE);
    //Insere hoje ou retira ultima vez
    if (!p.ultimavez) {
      // console.log("Marcado feito " + p.dados.cartao + " em " + hoje)
      set(ultimavezRef, hoje); //Atualiza data
      setUltimavez(hoje)
    } else {
      // console.log("Desmarcado feito " + p.dados.cartao + " em " + hoje)
      set(ultimavezRef, null); //Remove
      setUltimavez()
    }
  };

  //Calcula ocio
  if (ultimavez) {
    let ultimaParts = ultimavez.split("/");
    let feito = new Date(+ultimaParts[2], ultimaParts[1] - 1, +ultimaParts[0]);
    let hoje = new Date(Date.now());
    ocioDias = Math.ceil(Math.abs(hoje - feito) / (1000 * 60 * 60 * 24) - 1)
  }


  return (
    <Polygon
      pathOptions={ocioDias > 60 ? estiloPadrao : estiloFeito}
      positions={props.dados.coords}
      key={props.dados.codIBGE}
      eventHandlers={{
        click: (e) => {
          setActive(true); //Abrir popup ao clicar
        },
      }}
    >
      {active &&
        <CensoPopup
          dados={props.dados}
          ultimavez={ultimavez}
          ocioDias={ocioDias}
          marcarFeito={marcarFeito}
          logado={props.logado} />}
    </Polygon>
  )
}

export default Censo;