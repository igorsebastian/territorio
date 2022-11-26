import React, { useEffect, useRef, useState } from 'react'
import { LayersControl, LayerGroup, MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet'
import Quadra from './Quadra';
import quadrasJSON from "./json/quadras.json";

import { firestore } from "../../Firebase/config"
import { addDoc, collection, query, where, getDocs } from "@firebase/firestore"

// function cadastrarTodas() {
//   const quadrasRef = collection(firestore, "quadras");
//   quadrasJSON.features.map((f, i) => {
//     try {
//       console.log("cadastrando quadra "+i)
//       //addDoc(quadrasRef, { geometry: JSON.stringify(f.geometry), feito: true })
//     } catch (e) {
//       console.log(e)
//     }
//   })
// }

// async function getQuadras(){
//   const consulta = query(collection(firestore, 'quadras'), where("__name__", "==", "zy8MKAVcogn0gGKqA4bo"));
//   const quadras = await getDocs(consulta);
//   quadras.forEach((doc) => {
//     console.log(doc.data())
//   })
//   return quadras;
// }

function Quadras() {
  //const quadras = getQuadras();

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