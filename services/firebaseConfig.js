import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);
 
// Função para pegar o último dado do Realtime Database
 const pegarUltimoDadoDoFirebase = async (realtimeDb) => {
  try {
    const dadoRef = getDatabase.ref(realtimeDb).orderByKey().limitToLast(1);  // Ordena por chave e limita a 1 resultado
    const snapshot = await dadoRef.once("value");  // Pega o dado uma vez
    const dados = snapshot.val();  // Pega os dados do snapshot
    
    if (dados) {
      const ultimoDado = Object.values(dados)[0];  // Pega o primeiro (e único) valor da lista de dados
      return ultimoDado;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar o último dado do Firebase: ", error);
    return null;  // Retorna null em caso de erro
  }
};

export {auth, db, realtimeDb, pegarUltimoDadoDoFirebase}