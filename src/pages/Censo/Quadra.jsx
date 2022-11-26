import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet'

function Quadra(props) {
  const estiloPadrao = { padrao: true, color: 'purple', fillOpacity: 0, stroke: false, weight: .5 }
  const estiloFeito = { padrao: false, color: 'green', fillOpacity: .5, stroke: false }
  const [estilo, setEstilo] = useState(estiloPadrao);

  const quadraClicada = (e) => {
    if (e.padrao) {
      setEstilo(estiloFeito)  
    } else {
      setEstilo(estiloPadrao)
    }
  };

  return (
    
    <Polygon
      pathOptions={estilo}
      positions={props.dados.geometry.coordinates.map(p => p.map(v => [v[1], v[0]]))}
      eventHandlers={{
        click: (e) => {
          quadraClicada(estilo)
        },
      }}
    >
      {/* <Popup>
        <p>Quadra de censo {props.id}</p>
        { <button onClick={() => quadraClicada(estilo)}>
          Marcar censo em: {(new Date()).toLocaleDateString('en-GB')}
        </button> }
      </Popup> */}
    </Polygon>
  )
}

export default Quadra;