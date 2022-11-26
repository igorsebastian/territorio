import React, { useRef, useState } from 'react'
import { LayersControl, LayerGroup, useMapEvents, Marker, Popup, useMap, Polygon } from 'react-leaflet'
import { useLocation } from "react-router-dom";
import L from 'leaflet';

import censoJSON from "./json/censo.json";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function verificaEstilo(cartao){

}

function Censo() {
  const map = useMap();
  const estiloPadrao = { color: 'gray', fillOpacity: 0, weight: 2 }
  const estiloFeito = { color: 'green', fillOpacity: .5, stroke: true }
  const layerRef = useRef()
  const feito = useState(false);

  let query = useQuery(); //Parametos
  let cartao = query.get("cartao")


  //Se selecionado cartao, mostra somente ele
  if (cartao) {
    censoJSON.features = censoJSON.features.filter(item => item.properties.codIBGE == cartao)
    let coords = censoJSON.features[0].geometry.coordinates.map(p => p.map(v => [v[1], v[0]]))
    let bounds = L.polygon(coords).getBounds()
    map.fitBounds(bounds);
  }

  return (
    <LayersControl.Overlay checked name="Censo">
      <LayerGroup ref={layerRef}>
        {censoJSON.features.map(c => (
          <Polygon
            pathOptions={c.properties.ultimaVez != "Nunca" ? estiloFeito : estiloPadrao}
            positions={c.geometry.coordinates.map(p => p.map(v => [v[1], v[0]]))}
            key={c.properties.codIBGE}
          >
            <Popup>
              <div className="content" dangerouslySetInnerHTML={{ __html: c.properties.popupHTML }}></div>
            </Popup>
          </Polygon>
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  )
}

export default Censo;