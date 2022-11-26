import React from "react";
import Mapa from './pages/Mapa/Mapa'
import Censo from './pages/Censo/Censo'
import Quadras from './pages/Censo/Quadras'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/mapa" element={<Mapa></Mapa>} />
        <Route path="/censo" element={<Mapa><Censo/></Mapa>} />
        <Route path="/" element={<Mapa><Censo/><Quadras/></Mapa>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
