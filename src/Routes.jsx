import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Mapa from './pages/Mapa/Mapa'
import Censos from './pages/Censo/Censos'
import Quadras from './pages/Censo/Quadras'
import Login from './pages/Auth/Login'
import Logout from './pages/Auth/Logout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Mapa><Quadras/><Censos/></Mapa>} />
        <Route path="/mapa" element={<Mapa></Mapa>} />
        <Route path="/censo" element={<Mapa><Censos/></Mapa>} />
        <Route path="/quadras" element={<Mapa><Quadras/></Mapa>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} /> 
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
