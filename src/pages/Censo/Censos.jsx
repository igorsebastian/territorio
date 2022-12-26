import React, { useState, useEffect } from 'react'
import { LayersControl, LayerGroup, useMap, Pane } from 'react-leaflet'
import { useLocation } from "react-router-dom";
import L from 'leaflet';
import { Polygon } from 'react-leaflet'
import Censo from './Censo'
import { db } from "../../Firebase/config"
import { onValue, ref, } from "firebase/database";

//Parametros da URL
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const appscriptAPI = "https://script.google.com/macros/s/AKfycbzc4r9mPMFVmbk4knjfNI7N1tDgqOh_Xs7D_N-QUwakwWQydJ3Nx_EhoPjwfpOmoTA1/exec?"
function Censos() {
  const [cartoes, setCartoes] = useState([]);
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [ultimavez, setUltimavez] = useState([]);

  //Verifica se existe token na sessao
  let logado = sessionStorage.getItem('auth_token')?.length > 0

  //Parametros
  let query = useQuery();
  let cartaoEscolhido = query.get("cartao")

  //Referencias
  const map = useMap();
  //const layerRef = useRef()

  //Traz base do censo (Appscript)
  useEffect(() => {
    var fetchURL = appscriptAPI + "api=censo";
    if (cartaoEscolhido) { //Se escolhido territorio unico ajusta consulta
      fetchURL = fetchURL + "&codIBGE=" + cartaoEscolhido;
    }
    //Acessa API
    fetch(fetchURL)
      .then(res => res.json())
      .then(
        (cartoes) => {
          // setIsLoaded(true);
          if (cartaoEscolhido) { //Zoom nos cartões escolhidos
            let polys = [];
            cartoes.forEach(element => {
              polys.push(L.polygon(element.coords));
            });
            let bounds = L.featureGroup(polys).getBounds(); //Ajustar tela aos cartões selecionados
            map.fitBounds(bounds);
          }
          setCartoes(cartoes);
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
  }, [cartaoEscolhido, map]);

  
  //Traz ultima vez feito (firebase rt)
  useEffect(() => {
    const ultimavezRef = ref(db, 'feitos/censo/ultimaVez');
    onValue(ultimavezRef, (snapshot) => {
      if (snapshot.exists()) {
        setUltimavez(snapshot.val())
        // console.log("Atualiza feitos")
      }
    }, {
      onlyOnce: true
    });
  }, []);


  return (
    <LayersControl.Overlay checked name="Censo">
      <LayerGroup>
        {cartaoEscolhido && cartoes.length > 0 ? //Mascara
          <Pane style={{ zIndex: 400 }}>
            <Polygon
              pathOptions={{ color: 'grey', fillOpacity: 0.5 }}
              positions={[[[0, 90], [180, 90], [180, -90], [-180, -90]], cartoes.map((q) => q.coords)]}
            >
            </Polygon>
          </Pane> : null
        }

        <Pane style={{ zIndex: 9999 }}>
          {cartoes.map((q) => {
            return <Censo
              dados={q}
              key={q.codIBGE}
              ultimavez={ultimavez[q.codIBGE]}
              logado={logado} />
          })}
        </Pane>
      </LayerGroup>
    </LayersControl.Overlay>
  )
}

export default Censos;


  //Read FIREBASE
  // useEffect(() => {
  //   let cartoesRef
  //   if (cartaoEscolhido) {
  //     console.log("Filtrar por " + cartaoEscolhido)
  //     cartoesRef = fireQuery(ref(getDatabase(), "censo/cartoes"), orderByChild("properties/codIBGE"), equalTo(Number(cartaoEscolhido)));
  //   } else {
  //     cartoesRef = fireQuery(ref(getDatabase(), "censo/cartoes"), limitToFirst(5));
  //   }
  //   onValue(cartoesRef, (snapshot) => {
  //     let fetch = snapshot.val()
  //     fetch = Array.isArray(fetch) ? fetch : [fetch[Object.keys(fetch)[0]]]
  //     console.log(fetch)
  //     setCartoes(fetch)
  //   }, {
  //     onlyOnce: true
  //   });
  // }, []);