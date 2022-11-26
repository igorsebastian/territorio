import React, { useRef, useState, useEffect } from 'react'
import { LayersControl, LayerGroup, useMapEvents, Marker, Popup, useMap, Polygon } from 'react-leaflet'
import { useLocation } from "react-router-dom";
import L from 'leaflet';
//import Cartao from './Cartao';
import { db } from "../../Firebase/config"
import { get, getDatabase, onValue, ref, query as fireQuery, equalTo, set, child, orderByChild, limitToFirst } from "firebase/database";

//import censoJSON from "./json/censo.json";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Censo() {
  //Variaveis
  const estiloPadrao = { color: 'gray', fillOpacity: 0, weight: 2 }
  const estiloFeito = { color: 'green', fillOpacity: .5, stroke: true }
  const feito = useState(false);

  const [cartoes, setCartoes] = useState([]);

  //Parametros
  let query = useQuery();
  let cartaoEscolhido = query.get("cartao")


  useEffect(() => { 
    let cartoesRef
    if (cartaoEscolhido) {
      console.log("filtrado por "+cartaoEscolhido)
      cartoesRef = fireQuery(ref(getDatabase(), "censo/cartao/features"), orderByChild("properties/codIBGE"), equalTo(Number(cartaoEscolhido)));
    } else {
      cartoesRef = fireQuery(ref(getDatabase(), "censo/cartao/features"), limitToFirst(5));
    }
    onValue(cartoesRef, (snapshot) => {
      let fetch = snapshot.val()
      fetch = Array.isArray(fetch) ? fetch : [fetch[Object.keys(fetch)[0]]]
      console.log(fetch)
      setCartoes(fetch)
    }, {
      onlyOnce: true
    });
    //Params
    // if (cartaoEscolhido) {
    //   //setCartoes(cartoes.filter(item => item.properties.codIBGE == cartaoEscolhido))
    //   let coords = cartoes.geometry.coordinates.map(p => p.map(v => [v[1], v[0]]))
    //   let bounds = L.polygon(coords).getBounds()
    //   map.fitBounds(bounds);
    //   console.log(cartoes)
    // }
  }, []);


  //Referencias
  const map = useMap();
  const layerRef = useRef()

  return (
    <LayersControl.Overlay checked name="Censo">
      <LayerGroup>
        {cartoes?.map(c => {
          return (<Polygon
            pathOptions={c.properties.ultimaVez != "Nunca" ? estiloFeito : estiloPadrao}
            positions={c.geometry.coordinates.map(p => p.map(v => [v[1], v[0]]))}
            key={c.properties.codIBGE}
          >
            <Popup>
              <div className="content" dangerouslySetInnerHTML={{ __html: c.properties.popupHTML }}></div>
            </Popup>
          </Polygon>)
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  )
}

export default Censo;