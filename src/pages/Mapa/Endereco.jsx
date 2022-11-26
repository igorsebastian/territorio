import React from 'react'
import { LayerGroup, MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import enderecos from "./data/enderecos.geojson";

class Endereco extends React.Component {
  state = { geojson: {} };

  componentDidMount() {
    console.log("Fetch")
    // this.fetchData();
  }

  render() {
    console.info("Endereco render")
    if (this.state.isLoaded) {
      console.info(this.state.geojson)
    }
    return (
      <LayerGroup>
        {enderecos.features.map(end => (
          <Marker
            key={end.properties.serial}
            position={[
              end.geometry.coordinates[1],
              end.geometry.coordinates[0]
            ]}
          >
            <Popup
              position={[
                end.geometry.coordinates[1],
                end.geometry.coordinates[0]
              ]}
            >
              <div>
                <h2>{end.properties.endereco}</h2>
                <p>{end.properties.regiao}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LayerGroup>
    )
  }
}

export default Endereco;