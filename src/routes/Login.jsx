import React, { useState } from 'react';
import logo from '../assets/icone-doctolib192x192.png';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignIn(username, password ) 
  }

  function handleSignIn(email, password ) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
    const user = userCredential.user;
    navigate('/form')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img src={logo} alt="Doctolib logo" />
      </div>
      <h1>Connexion</h1>
      <label className="login-label">
        Nom d'utilisateur:
        <input className="login-input" type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label className="login-label">
        Mot de passe:
        <input className="login-input" type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button className="login-button" type="submit">Log In</button>
    </form>
  );
}

export default LoginPage;
