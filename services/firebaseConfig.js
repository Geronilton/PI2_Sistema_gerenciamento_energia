import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; 

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
 


export {auth, db, realtimeDb}