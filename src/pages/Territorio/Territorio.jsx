import React, { useState, useEffect } from 'react'
import { LayersControl, LayerGroup, Marker } from 'react-leaflet'
import { db } from "../../service/firebase"
import { onValue, ref, } from "firebase/database";
import icone from './IconeTerritorio'
import TerritorioPopup from './TerritorioPopup'

const appscriptAPI = "https://script.google.com/macros/s/AKfycbzc4r9mPMFVmbk4knjfNI7N1tDgqOh_Xs7D_N-QUwakwWQydJ3Nx_EhoPjwfpOmoTA1/exec?"

function Territorio(props) {
  const [cartoes, setCartoes] = useState([]);
  const [isLoaded, setIsLoaded] = useState([]);
  //const [error, setError] = useState([]);
  const [ultimavez, setUltimavez] = useState("");
  const [ocio, setOcio] = useState([]);

  //Traz base do censo (Appscript)
  useEffect(() => {
    var fetchURL = appscriptAPI + "api=cartoes";
    fetch(fetchURL)
      .then(res => res.json())
      .then(
        (cartoes) => {
          setIsLoaded(true);
          setCartoes(cartoes);
        },
        (error) => {
          setIsLoaded(false);
          //setError(error);
        }
      )
  }, []);

  //Traz ultima vez feito (firebase rt)
  useEffect(() => {
    const ultimavezRef = ref(db, 'feitos/territorio/ultimaVez');
    onValue(ultimavezRef, (snapshot) => {
      if (snapshot.exists()) {
        var dados = snapshot.val()
        var ocio = [];

        for (var key in dados) {
          let ultimavez = dados[key]
          let dias = calculaOcioDias(ultimavez);

          ocio.push({
            ultimavez: ultimavez,
            ocio: dias
          })

          dados[key] = {
            ultimavez: ultimavez,
            ocio: dias
          }
        }
        setUltimavez(dados);
        setOcio(ocio);
      }
    }, {
      onlyOnce: true
    });
  }, []);

  const calculaOcioDias = function (data) {
    let ultimaParts = data.split("/");
    let feito = new Date(+ultimaParts[2], ultimaParts[1] - 1, +ultimaParts[0]);
    let hoje = new Date(Date.now());
    return Math.ceil(Math.abs(hoje - feito) / (1000 * 60 * 60 * 24) - 1)
  }

  //Converter numeros em gradiente
  var max = Math.max(...ocio.map(c => c.ocio), 1000);
  //var min = Math.min(...ocio.map(c => c.ocio));
  function scale(number = 0, inMin, inMax, outMin = 0, outMax = 100) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  return isLoaded && (
    <LayersControl.Overlay checked name="Cartoes">
      <LayerGroup>
        {cartoes.map((c, i) => {
          var datas = ultimavez[c.cartao] ?? "";
          var saturacao = scale(datas.ocio ?? 1000, max, 0);
          return (
            <Marker
              key={c.cartao}
              position={c.coords}
              icon={icone(c.cartao, c.quantidade, c.regiao, saturacao)}>
              <TerritorioPopup dados={c} ultimavez={datas.ultimavez} ocio={datas.ocio} />
            </Marker>
          )
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  )
}

export default Territorio;