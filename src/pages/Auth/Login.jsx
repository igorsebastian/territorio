import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import "./styles.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = (event) => {
    event.preventDefault();
    var { email, senha } = document.forms[0]; //Get input

    //Firebase email login
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, senha.value)
      .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        sessionStorage.setItem('auth_token', userCredential._tokenResponse.refreshToken)
        setIsSubmitted(true);
        // ... 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessages({ code: errorCode, message: errorMessage })
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = () => {
    if (errorMessages) {
      return <div className="error">{errorMessages.code} - {errorMessages.message}</div>
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage()}
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="senha" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  const login = (
    <div className="app" >
      <div className="login-form">
        <div className="title">Entrar</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  )

  const logado = (
    <div className="app" >
      {console.log(user)}
      <div className="login-form">
        <div className="title">Já está logado</div>
        <div>{user?.email}</div>
        <br/>
        <div><a href="logout">Sair?</a></div>
      </div>
    </div>

  )

  return (
    <>
      {user ? logado : login}
    </>
  );
}

export default Login;
