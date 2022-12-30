import L from 'leaflet'
import tinycolor from 'tinycolor2';

//Icone dinamico
function IconeCartao(codigo = "???", qtd = 0, regiao, saturado) {
  //Prepara cores
  var cor = {};
  switch (regiao) {
    case "Azul":
      cor = {
        fundo: "#2192FF",
        texto: "black"
      }
      break;
    case "Verde":
      cor = {
        fundo: "#38E54D",
        texto: "black"
      }
      break;
    case "Vermelho":
      cor = {
        fundo: "#FF0000",
        texto: "black"
      }
      break;
    case "Amarelo":
      cor = {
        fundo: "#FFFF00",
        texto: "black"
      }
      break;
    default:
      cor = {
        fundo: "#BFFF00",
        texto: "black"
      }
      break;
  }
  //Escurece
  if (saturado) {

    cor = {
      fundo: tinycolor(cor.fundo).desaturate(saturado).toString(),//"#BDBDBD",
      texto: "black"
    }

  }
  //Prepara SVG
  var svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" version="1.1">
    <circle cy="50%" cx="50%" r="45%" stroke="black" stroke-width="2" fill="${cor.fundo}" />  
    <g font-size="15" font-family="sans-serif" fill="${cor.texto}" font-weight="bold" stroke="none" text-anchor="middle" dominant-baseline="middle" >
    <text x="50%" y="50%">${codigo}</text></g>
    <g font-size="12" font-family="sans-serif" fill="${cor.texto}" stroke="none" text-anchor="middle" dominant-baseline="middle">
    <text x="50%" y="75%">${qtd}</text></g></svg>`

  return new L.divIcon({
    html: svg,
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}


export default IconeCartao;