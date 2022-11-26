import React, { useState } from 'react'
import { useMapEvents, Marker, Popup,  } from 'react-leaflet'


export default function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        load() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            console.log(e)
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Localização atual</Popup>
        </Marker>
    )
}