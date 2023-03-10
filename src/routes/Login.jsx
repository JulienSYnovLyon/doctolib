import React, { useState, useEffect } from 'react';
import logo from '../assets/icone-doctolib192x192.png';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeInstallPromptEvent = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent);
    };
  }, []);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSignIn(username, password) ;
  }

  function handleSignIn(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/form');
      })
      .catch((error) => {
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);    
        } else {
          console.log('La vibration n\'est pas supportée par cet appareil.');
        }
      });
  }

  function handleInstallClick() {
    const deferredPrompt = window.deferredPrompt;
    if (deferredPrompt !== undefined) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        window.deferredPrompt = null;
      });
    }
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
        <button className="login-button" type="button" id="installApp" onClick={handleInstallClick}>Installer l'application</button>
      </form>
  );
}

export default LoginPage;
