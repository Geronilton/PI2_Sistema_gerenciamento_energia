import { Text, View, Image, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style/MyStyle';
import logo from '../../images/Logo.png'
import { getAuth, signOut } from 'firebase/auth';
import { ref, get, onValue } from 'firebase/database'; // Certifique-se de importar corretamente
import { realtimeDb } from '../../../services/firebaseConfig';

export default function Perfil({ navigation }) {
    const [dados, setDados] = useState({});
    const [historico, setHistorico] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    useEffect(() => {
        if (userId) {
            const userRef = ref(realtimeDb, `users/${userId}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log("dados usuario",userData)
                    setDados({  
                        email: userData.email || 'Email não disponível',
                        name: userData.name || 'Nome não disponível'
                    });
                    console.log("dados usuario",userData)
                } else {
                    console.log('Nenhum dado disponível');
                }
            }).catch((error) => {
                console.error('Erro ao buscar dados do usuário: ', error);
            });
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const dbRef = ref(realtimeDb, 'sensores/correnteG');
            const unsubscribe = onValue(dbRef, (snapshot) => {
                const data = [];
                snapshot.forEach((childSnapshot) => {
                    const item = childSnapshot.val();
                    const timestamp = new Date(item.timestamp); // Ajuste conforme o formato de timestamp
                    data.push({
                        id: childSnapshot.key,
                        corrente: item.corrente,
                        timestamp,
                    });
                });
                const organizedData = organizeDataByMonth(data);
                setHistorico(organizedData);
            });

            return () => unsubscribe();
        }
    }, [userId]);

    // Function to organize data by month
    const organizeDataByMonth = (data) => {
        const months = Array.from({ length: 12 }, (_, i) => i + 1); // Meses de 1 a 12
        const result = months.map(month => {
            const monthlyData = data.filter(item => {
                const date = item.timestamp;
                return date.getMonth() + 1 === month;
            });
            const totalCorrente = monthlyData.reduce((sum, item) => sum + item.corrente, 0);
            return { mes: month, corrente: totalCorrente };
        });
        return result;
    };

    // Render each item of the month
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.tabelaid}>
                <Text style={styles.tabdados}>{`Mês ${item.mes} :`}</Text>
                <Text style={styles.tabdados}>{item.corrente.toFixed(2) || '-'}</Text>
            </View>
        </View>
    );
    

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

    return (
        <View style={styles.container}>
            <View style={styles.botaoSession}>
                <Pressable style={{width:50, height:25,alignItems: 'center'}}
                 onPress={logout}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color:'#f4f4f4'}}>Sair</Text>
                </Pressable>
            </View>
            <View style={styles.perfil}>
                <Image style={styles.image} source={logo} />
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

            <FlatList
                data={historico}
                renderItem={renderItem}
                keyExtractor={(item) => item.mes.toString()}
                ListEmptyComponent={<Text>No data available</Text>}
                contentContainerStyle={styles.tabela}
            />
        
        </View>
    );
}
