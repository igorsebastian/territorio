import React from 'react'
import { MapContainer, LayersControl, TileLayer } from 'react-leaflet'
import LocationMarker from './Location';
import L from 'leaflet';

import "leaflet/dist/leaflet.css";
import './styles.css'

//Ajusta icone default
import iconDefault from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: iconDefault,
  shadowUrl: iconShadow
});

const mapDiv = {
  width: "100%",
  height: "100vh",
}


function Mapa(props) {
  const center = [-20.465182, -54.621828];

  return (
    <MapContainer
      styles={mapDiv}
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      updateWhenZooming={false}
      updateWhenIdle={true}
      preferCanvas={true}
      renderer={L.canvas()}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      <LayersControl position="topright">
        {props.children}
      </LayersControl>
    </MapContainer>
  )
}

export default Mapa;