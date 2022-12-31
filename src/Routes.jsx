import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider from './contexts/AuthContext';

import Mapa from './pages/Mapa/Mapa'
import Censos from './pages/Censo/Censos'
import Quadras from './pages/Censo/Quadras'
import Territorio from './pages/Territorio/Territorio'
import Login from './pages/Auth/Login'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Mapa><Censos /><Quadras /></Mapa>} />
          <Route path="/mapa" element={<Mapa></Mapa>} />
          <Route path="/territorio" element={<Mapa><Territorio /></Mapa>} />
          <Route path="/censo" element={<Mapa><Censos /><Quadras /></Mapa>} />
          <Route path="/quadras" element={<Mapa><Quadras /></Mapa>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
