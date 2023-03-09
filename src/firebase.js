import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "doctolib-8034a.firebaseapp.com",
  projectId: "doctolib-8034a",
  storageBucket: "doctolib-8034a.appspot.com",
  messagingSenderId: "196333589340",
  appId: "1:196333589340:web:f59a02112eb3f99336a799"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;