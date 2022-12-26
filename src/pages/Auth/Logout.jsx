import React, { useState } from 'react'
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const [isSignOut, setSignOut] = useState(false);

  const auth = getAuth();
  signOut(auth).then(() => {
    setSignOut(true);
    sessionStorage.removeItem('auth_token')
  }).catch((error) => {
    // An error happened.
  });

  const deslogado = (
    <>
      <div>Deslogado com sucesso</div>
      <br />
      <div><a href="login">Entrar?</a></div>
    </>
  )

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Deslogar</div>
        {isSignOut ?
          deslogado
          : <div>Erro: Não foi possível deslogar</div>}
      </div>
    </div>
  );
}

export default Logout;
