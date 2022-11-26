import React, { useEffect, useRef, useState } from 'react'
import { db } from "../../Firebase/config"
import { onValue, ref, set} from "firebase/database";
import quadrasJSON from "../Censo/json/quadras.json";

function ImportarQuadras() {
  //set(ref(db, ""), {})
  return (
    <p>Importar quadras</p>
  )
}

export default ImportarQuadras;