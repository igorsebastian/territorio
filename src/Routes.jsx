import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Mapa from './pages/Mapa/Mapa'
import Censo from './pages/Censo/Censo'
import Quadras from './pages/Censo/Quadras'
import ImportarQuadras from './pages/Importar/ImportarQuadras'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Mapa><Censo/><Quadras/></Mapa>} />
        <Route path="/mapa" element={<Mapa></Mapa>} />
        <Route path="/censo" element={<Mapa><Censo/></Mapa>} />
        <Route path="/quadras" element={<Mapa><Quadras/></Mapa>} />
        {/* <Route path="/importar" element={<ImportarQuadras/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
