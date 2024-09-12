import { Text, View, Image, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style/MyStyle';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get, onValue } from 'firebase/database'; // Certifique-se de importar corretamente

export default function Perfil({ navigation }) {
    const [dados, setDados] = useState({});
    const [historico, setHistorico] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    // Fetch user data from Realtime Database
    useEffect(() => {
        if (user) {
            setDados(prevState => ({
                ...prevState,
                email: user.email // Email do Firebase Auth
            }));
        }
    }, [user]);

    // Fetch nome from Realtime Database
    useEffect(() => {
        if (userId) {
            const db = getDatabase();
            const userRef = ref(db, `Usuarios/${userId}/nome`); // Ajuste conforme a estrutura do banco de dados
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setDados(prevState => ({
                        ...prevState,
                        nome: snapshot.val() // Nome do Realtime Database
                    }));
                } else {
                    console.log('No data available');
                }
            }).catch((error) => {
                console.error('Error fetching name: ', error);
            });
        }
    }, [userId]);
        

    // Fetch current consumption history from Realtime Database
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, 'sensores/corrente'); // Referência ao caminho dos sensores
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
                newData.push(childSnapshot.val()); // Pega o valor de cada item
            });
            setHistorico(newData); // Atualiza o estado com os dados recebidos
        });

        // Limpar o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    // Função de logout
    function logout() {
        signOut(auth)
            .then(() => {
                // Redireciona para a página de login ou inicial
                navigation.replace('Login'); // Ajuste conforme o roteamento que você está utilizando
            })
            .catch((error) => {
                console.error('Error during sign out: ', error);
            });
    }

    const renderItem = ({ item }) => (
        <View style={styles.tabelaid}>
            <Text style={styles.tabdados}>{item}</Text> {/* Ajuste conforme a estrutura dos dados */}
        </View>
    );
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
                    <Text style={styles.titlename}>{dados.nome}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.dados}>Email:</Text>
                <Text style={styles.text}>{dados.email}</Text>
            </View>

            <View>
                <Text style={styles.historico}>Histórico de Consumo</Text>
            </View>

            
                <FlatList
                data={historico}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text>No data available</Text>}
                contentContainerStyle={styles.tabela} // Estilo aplicado ao container da FlatList
            />
        
        </View>
    );
}
