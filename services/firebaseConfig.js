import { initializeApp } from "firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPv5LbTNEL7Lyv2nlBTQTnmirNGP0uUdc",
  authDomain: "gerenciadorenergia-4f6e0.firebaseapp.com",
  projectId: "gerenciadorenergia-4f6e0",
  storageBucket: "gerenciadorenergia-4f6e0.appspot.com",
  messagingSenderId: "1089118535787",
  appId: "1:1089118535787:web:befccdd55a3fff29ff312e",
  measurementId: "G-SV34VCFR8B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {auth, database}