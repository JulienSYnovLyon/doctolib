import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css';
import logo from '../assets/icone-doctolib192x192.png';

function FormPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDateChange(date) {
    setDate(date);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Name: ${name}, Date: ${date}`);
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="logo-container">
        <img src={logo} alt="Doctolib logo" />
      </div>
      <br></br>
      <div className="form-group">
      <label>
        Nom:
        <select onChange={handleNameChange}>
            <option value="jean">Jean</option>
            <option value="pierre">Pierre</option>
            <option value="jacques">Jacques</option>
        </select>
      </label>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default FormPage;