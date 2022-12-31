import React, { useState } from 'react'
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../service/firebase"
import useAuth from "../../hooks/useAuth"
import "./styles.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState(false);
  const { user, setUser } = useAuth();

  //Faz login
  const handleSubmit = (event) => {
    event.preventDefault();
    var { email, senha } = document.forms[0]; //Get input
    setPersistence(auth, browserLocalPersistence) //Salva sessão na maquina
      .then(() => {
        return signInWithEmailAndPassword(auth, email.value, senha.value) //Realiza login 
          .then((userCredential) => { // Signed in 
            setUser(userCredential.user)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessages({ code: errorCode, message: errorMessage })
          });
      })

  };

  //Desfaz login
  const handleLogout = (event) => {
    signOut(auth).then(() => {
      setUser();
      console.log("Usuario deslogado")
    }).catch((error) => {
      console.log("Erro ao deslogar")
    })
  }

  // Error message
  const renderErrorMessage = () => {
    if (errorMessages) {
      return <div className="error">{errorMessages.code} - {errorMessages.message}</div>
    }
  };

  return (
    <>
      {user ? //Verifica login
        //Logado
        (<div className="app" >
          <div className="login-form">
            <div className="title">Já está logado</div>
            <div>{user.email}</div>
            <br />
            <div><a href="login" onClick={handleLogout}>Sair?</a></div>
          </div>
        </div>)
        :
        //Não logado
        (<div className="app" >
          <div className="login-form">
            <div className="title">Entrar</div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                {renderErrorMessage()}
                <div className="input-container">
                  <label>Email </label>
                  <input type="text" name="email" required />
                </div>
                <div className="input-container">
                  <label>Senha </label>
                  <input type="password" name="senha" required />
                </div>
                <div className="button-container">
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </>
  );
}

export default Login;
