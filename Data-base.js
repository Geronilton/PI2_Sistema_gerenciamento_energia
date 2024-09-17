// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//adicionei para se conectar ao farebase e pegar as informações que a tela de cadastro de tomadas necessitam
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, set, push,remove, update } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDRlwRoWSYbNlFt9gR4DmPYKrTr1VBaAo",
  authDomain: "sgenergia-residencial.firebaseapp.com",
  projectId: "sgenergia-residencial",
  storageBucket: "sgenergia-residencial.appspot.com",
  messagingSenderId: "889899496447",
  appId: "1:889899496447:web:898ff9385b6784b891adca",
  measurementId: "G-DYFMNY8GMK",
  databaseURL: "https://sgenergia-residencial-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//adicionei para se conectar ao farebase e pegar as informações que a tela de cadastro de tomadas necessitam
const db = getDatabase( app );