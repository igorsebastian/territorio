import React, { useEffect, useRef, useState } from 'react'
import { LayersControl, LayerGroup, MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet'
import L from 'leaflet';
import Supercluster from 'supercluster';

import Quadra from './Quadra';

import quadrasJSON from "./json/quadras.json";


function Quadras() {
  return (
    <LayersControl.Overlay checked name="Quadras">
    <LayerGroup>
      {quadrasJSON.features.map((q, index) => {
        return index > 0 ?
          <Quadra dados={q} id={index} key={index} />
          : null
      })}
    </LayerGroup >
    </LayersControl.Overlay >
  )
}

export default Quadras;