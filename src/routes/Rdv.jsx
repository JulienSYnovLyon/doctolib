import React, { useState, useEffect  } from 'react';
import logo from '../assets/icone-doctolib192x192.png';
import { getAuth} from "firebase/auth"
import { collection, getDocs , query, where} from "firebase/firestore";
import db from '../firebase';
import './RDV.css';

function RDVPage() {
  
    const [rdvList , setRdvList] = useState([]);

    useEffect(() => {

        getAuth().onAuthStateChanged((user) => {
            if (user) {
                fetchrdv(user);
            }
        });

        const fetchrdv = async (user) => {

            const querySnapshot = await getDocs(collection(db, "rdv"), where("patient", "==", user.uid));
            const newData = querySnapshot.docs.map((doc) => {
                const datetime = new Date(doc.data().date);
                return {date: datetime, medecin: doc.data().medecin};
            });
            setRdvList(newData);
        };

    }, []);
  
    return (
        <div>
        <h1>Liste de vos rendez-vous</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Médecin</th>
            </tr>
          </thead>
          <tbody>
            {rdvList.map((rdv, index) => (
              <tr key={index}>
                <td>{rdv.date.toLocaleString()}</td>
                <td>{rdv.medecin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default RDVPage;
