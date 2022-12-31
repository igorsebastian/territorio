import React, { useState, useEffect } from 'react'
import { Popup, Polygon } from 'react-leaflet'

import { db } from "../../service/firebase"
import { ref, set } from "firebase/database";
import useAuth from "../../hooks/useAuth"


function Quadra(props) {
  const { user } = useAuth();
  const [ultimavez, setUltimavez] = useState("");
  const [quadraAtiva, setquadraAtiva] = useState(false);

  const estiloPadrao = { padrao: true, color: 'black', fillOpacity: 0, stroke: false, weight: 2 }
  const estiloFeito = { padrao: false, color: 'green', fillOpacity: .5, stroke: false }
  // const [estilo, setEstilo] = useState(estiloPadrao);
  var ocioDias = 1000;
  //Calcula ocio
  if (ultimavez) {
    let ultimaParts = ultimavez.split("/");
    let feito = new Date(+ultimaParts[2], ultimaParts[1] - 1, +ultimaParts[0]);
    let hoje = new Date(Date.now());
    ocioDias = Math.ceil(Math.abs(hoje - feito) / (1000 * 60 * 60 * 24) - 1)
  }

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


  // const [refReady, setRefReady] = useState(false);
  // let popupRef = useRef();
  //Abrir popup (erro de lat long...)
  //const map = useMap();
  // useEffect(() => {
  //   if (refReady && quadraAtiva) {
  //     popupRef.openOn(map);
  //   }
  // }, [quadraAtiva, refReady, map]);

  return (
    <Polygon
      pathOptions={ocioDias > 360 ? estiloPadrao : estiloFeito}
      positions={props.coords}
      eventHandlers={{
        click: (e) => {
          setquadraAtiva(props)
        },
      }}
    >
      {quadraAtiva &&
        <Popup
          // ref={(r) => {
          //   popupRef = r;
          //   setRefReady(true);
          // }}
          onClose={() => {
            setquadraAtiva(false);
          }}>
          <p>Quadra de censo {props.id}</p>
          {user && <button onClick={() => marcarFeito()}>
            Marcar censo em: {(new Date()).toLocaleDateString('en-GB')}
          </button>}
        </Popup>
      }
    </Polygon>
  )
}

export default Quadra;