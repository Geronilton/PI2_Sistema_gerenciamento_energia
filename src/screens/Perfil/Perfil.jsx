import { Text, View, Image, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style/MyStyle';
import { db, realtimeDb } from '../../../services/firebaseConfig'; // Ajuste a importação
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';

const DATA = [
    {
        id: '1',
        nome: '400.0',
    },
];

const Item = ({ nome, id }) => {
    return (
        <View style={styles.tabelaid}>
            <Text style={styles.tabdados}>{id}</Text>
            <Text style={styles.tabdados}>{nome}</Text>
        </View>
    );
}

export default function Perfil() {
    const [dados, setDados] = useState({});
    const [historico, setHistorico] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const docRef = doc(db, 'users', userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDados(docSnap.data());
                }
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        const dbRef = ref(realtimeDb, 'sensores');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
                newData.push(childSnapshot.val());
            });
            setHistorico(newData); // Atualiza o estado com os dados recebidos
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    function logout() {
        signOut(auth)
            .then(() => {
                // Redireciona para a página inicial ou para onde você desejar
                // Ajuste conforme a sua configuração de roteamento
                router.replace('/');
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.botaoSession}>
                <Pressable onPress={logout}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Sair</Text>
                </Pressable>
            </View>
            <View style={styles.perfil}>
                <Image style={styles.image} source={require('../../images/Logo.png')} />
                <View style={styles.nome}>
                    <Text style={styles.titlename}>{dados.name}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.dados}>Email:</Text>
                <Text style={styles.text}>{dados.email}</Text>
            </View>

            <View>
                <Text style={styles.historico}>Histórico de Consumo</Text>
            </View>

            <View style={styles.tabela}>
                {historico.length > 0 ? (
                    historico.map((item, index) => (
                        <View style={styles.tabelaid} key={index}>
                            <Text style={styles.tabdados}>{item.corrente}</Text> 
                        </View>
                    ))
                ) : (
                    <Text>No data available</Text>
                )}
            </View>
        </View>
    );
}
