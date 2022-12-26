import React, { useState, useEffect } from 'react'
import { Popup, Polygon } from 'react-leaflet'
import { db } from "../../Firebase/config"
import { ref, set } from "firebase/database";


function Quadra(props) {
  const estiloPadrao = { padrao: true, color: 'black', fillOpacity: 0, stroke: false, weight: 2 }
  const estiloFeito = { padrao: false, color: 'green', fillOpacity: .5, stroke: false }
  // const [estilo, setEstilo] = useState(estiloPadrao);
  const [ultimavez, setUltimavez] = useState("");
  var ocioDias = 1000;

  //Salva ultima vez em State
  useEffect(() => {
    setUltimavez(props.ultimavez);
  }, [props.ultimavez])

  //Marcar como feito e atualizar ultima vez
  const marcarFeito = () => {
    var hoje = new Date(Date.now()).toLocaleDateString("en-GB")
    const ultimavezRef = ref(db, 'feitos/quadras/ultimaVez/' + props.id);
    //Insere hoje ou retira ultima vez
    if (!ultimavez) {
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
      pathOptions={ocioDias > 360 ? estiloPadrao : estiloFeito}
      positions={props.coords}
    // eventHandlers={{
    //   click: (e) => {
    //     quadraClicada(estilo)
    //   },
    // }}
    >
      {props.logado ? 
      <Popup>
        <p>Quadra de censo {props.id}</p>
        {<button onClick={() => marcarFeito()}>
          Marcar censo em: {(new Date()).toLocaleDateString('en-GB')}
        </button>}
      </Popup>
      : <></>}
    </Polygon>
  )
}

export default Quadra;