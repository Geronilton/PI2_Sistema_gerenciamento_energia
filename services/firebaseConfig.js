import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 

// meu banco de dados de teste ainda adcionarei o definitivo
// const firebaseConfig = {
//   apiKey: "AIzaSyAPv5LbTNEL7Lyv2nlBTQTnmirNGP0uUdc",
//   authDomain: "gerenciadorenergia-4f6e0.firebaseapp.com",
//   projectId: "gerenciadorenergia-4f6e0",
//   storageBucket: "gerenciadorenergia-4f6e0.appspot.com",
//   messagingSenderId: "1089118535787",
//   appId: "1:1089118535787:web:befccdd55a3fff29ff312e",
//   measurementId: "G-SV34VCFR8B",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCDRlwRoWSYbNlFt9gR4DmPYKrTr1VBaAo",
  authDomain: "sgenergia-residencial.firebaseapp.com",
  projectId: "sgenergia-residencial",
  storageBucket: "sgenergia-residencial.appspot.com",
  messagingSenderId: "889899496447",
  appId: "1:889899496447:web:898ff9385b6784b891adca",
  measurementId: "G-DYFMNY8GMK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export {auth, db, realtimeDb}