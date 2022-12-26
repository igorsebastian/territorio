import React from 'react'
import { Popup } from 'react-leaflet'

function CensoPopup(props) {
    const d = props.dados;

    const encoded = encodeURI(d.urlPDF);
    const whatslink = "https://wa.me/?text=" + encoded
    const mapslink = "https://www.google.com/maps/dir/?api=1&origin=&destination=" + d.centroid.toString() + "&travelmode=walking";


    return (
        <Popup>
            <h4 style={{ textAlign: "center" }}><b>Censo {d.cartao}</b></h4>
            <b>Congregação:</b> {d.congregacao}<br />
            <b>Ócio: </b> {props.ocioDias}<br />
            <b>Última Vez: </b> {props.ultimavez}<br />
            <b>Código: </b> {d.codIBGE} <br />
            <div className="row justify-content-center mt-1">
                <a target="_blank" rel="noreferrer" role="button" className="btn btn-primary active" href={mapslink}>
                    Centralizar no Google Maps
                </a>
            </div>
            <div className="row justify-content-center">
                <div className="my-1">
                    <a target="_blank" rel="noreferrer" role="button" className="btn btn-success active mr-1" href={whatslink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                        </svg> Enviar PDF
                    </a>
                    <a target="_blank" rel="noreferrer" role="button" className="btn btn-dark active" href={encoded}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 87.3 78" height="16">
                            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
                            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
                            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
                            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
                            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
                            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
                        </svg> Abrir no Drive
                    </a>
                </div>
            </div>
            {props.logado ?
                <div className="row justify-content-center">
                    <button className="btn btn-warning active text-white" onClick={() => props.marcarFeito(props)}>
                        {!props.ultimavez ? "Marcar como feito" : "Desmarcar como feito"}
                    </button>
                </div>
                : null}
        </Popup>
    )
}

export default CensoPopup;