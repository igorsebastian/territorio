import React, { useEffect, useState } from 'react'
import { LayersControl, LayerGroup } from 'react-leaflet'
import { useLocation } from "react-router-dom";
import Quadra from './Quadra';
//import quadrasJSON from "./json/quadras.json";
import { db } from "../../Firebase/config"
import { onValue, ref, } from "firebase/database";

//Parametros da URL
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const appscriptAPI = "https://script.google.com/macros/s/AKfycbzc4r9mPMFVmbk4knjfNI7N1tDgqOh_Xs7D_N-QUwakwWQydJ3Nx_EhoPjwfpOmoTA1/exec?"
function Quadras() {
  // const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quadras, setQuadras] = useState([]);
  const [ultimavez, setUltimavez] = useState([]);

  //Verifica se existe token na sessao
  let logado = sessionStorage.getItem('auth_token')?.length > 0

  //Parametros
  let query = useQuery();
  let cartaoEscolhido = query.get("cartao")

  //Traz base quadras (appscript)
  useEffect(() => {
    var fetchURL = appscriptAPI + "api=quadras";
    if (cartaoEscolhido) { //Se escolhido territorio unico ajusta consulta
      fetchURL = fetchURL + "&codIBGE=" + cartaoEscolhido;
    }

    fetch(fetchURL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuadras(result);
        },
        (error) => {
          setIsLoaded(true);
          // setError(error);
        }
      )
  }, [cartaoEscolhido]);

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
              logado={logado} />
          })}
        </LayerGroup >
      </LayersControl.Overlay >
    )
  } else {
    return null;
  }
}

export default Quadras;