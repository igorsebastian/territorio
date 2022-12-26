import React, { useEffect, useState } from 'react'
import { LayersControl, LayerGroup } from 'react-leaflet'
import Quadra from './Quadra';
//import quadrasJSON from "./json/quadras.json";
import { db } from "../../Firebase/config"
import { onValue, ref, } from "firebase/database";


const appscriptAPI = "https://script.google.com/macros/s/AKfycbzc4r9mPMFVmbk4knjfNI7N1tDgqOh_Xs7D_N-QUwakwWQydJ3Nx_EhoPjwfpOmoTA1/exec?"
function Quadras() {
  // const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quadras, setQuadras] = useState([]);
  const [ultimavez, setUltimavez] = useState([]);

  //Verifica se existe token na sessao
  let logado = sessionStorage.getItem('auth_token')?.length > 0

  //Traz base quadras (appscript)
  useEffect(() => {
    fetch(appscriptAPI + "api=quadras")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuadras(JSON.parse(result));
        },
        (error) => {
          setIsLoaded(true);
          // setError(error);
        }
      )
  }, []);

  //Traz ultima vez feito (firebase rt)
  useEffect(() => {
    const ultimavezRef = ref(db, 'feitos/quadras/ultimaVez');
    onValue(ultimavezRef, (snapshot) => {
      if (snapshot.exists()) {
        setUltimavez(snapshot.val())
        // console.log("Atualiza feitos")
      }
    }, {
      onlyOnce: true
    });
  }, []);



  if (isLoaded) {
    return (
      <LayersControl.Overlay checked name="Quadras">
        <LayerGroup>
          {quadras.map((q) => {
            return <Quadra
              coords={q.coords}
              id={q.id}
              key={q.id}
              ultimavez={ultimavez[q.id]}
              logado = {logado} />
          })}
        </LayerGroup >
      </LayersControl.Overlay >
    )
  } else {
    return null;
  }
}

export default Quadras;