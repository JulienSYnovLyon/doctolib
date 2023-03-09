import React, { useState, useEffect  } from 'react';
import logo from '../assets/icone-doctolib192x192.png';
import { getAuth} from "firebase/auth"
import { collection, getDocs , query, where , doc} from "firebase/firestore";
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
            const newData = [];
            for (const doc1 of querySnapshot.docs) {
              const datetime = new Date(doc1.data().date);
              const medecinId = doc1.data().medecin;
              let nom;
              let prenom ; 
              if(medecinId == "dT4bWeMZJv1juTeLDD9a")
              {
                    nom  = "dupont";
                    prenom = "jean"; 
              }
              else if (medecinId == "fESjTkdQj4JnTgO9wKqh")
              {
                    nom  = "durieux";
                    prenom = "daniel"; 
              }
              else
              {
                    nom  = "un nom";
                    prenom = "un preom"; 
              }
              //const medecinDoc = await getDocs(doc(db, "medecins", medecinId));
              //const medecinData = medecinDoc.data();
              //newData.push({ date: datetime, medecin: medecinData.nom + " " + medecinData.prenom });
              newData.push({ date: datetime, medecin: nom + " " + prenom });
            }
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
