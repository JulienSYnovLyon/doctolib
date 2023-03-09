import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css';
import logo from '../assets/icone-doctolib192x192.png';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { getAuth } from "firebase/auth";

function FormPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [medecins, setMedecins] = useState([]);

  useEffect(() => {
    const fetchMedecins = async () => {
      const querySnapshot = await getDocs(collection(db, "medecins"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nomComplet: `${doc.data().nom} ${doc.data().prenom}`
      }));
      setMedecins(data);
    };
  
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        fetchMedecins();
      }
    });
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDateChange(date) {
    setDate(date);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const medecinID = getSelectedMedecinId()
    console.log(medecinID)
  }

  const getSelectedMedecinId = () => {
    const selectElement = document.getElementById("select-name");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    console.log(selectedOption)
    return selectedOption.getAttribute("value");
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-logo-container">
        <img src={logo} alt="Doctolib logo" />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="select-name">Nom:</label>
        <select id="select-name" className="form-select" onChange={handleNameChange}>
          {medecins.map((medecin) => (
            <option key={medecin.id} value={medecin.id}>{medecin.nomComplet}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date-picker">Date:</label>
        <DatePicker
          id="date-picker"
          className="form-date-picker"
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button className="form-submit-button" type="submit">Envoyer</button>
    </form>
  );
}

export default FormPage;
