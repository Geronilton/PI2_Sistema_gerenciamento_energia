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
            const fetchData = async () => {
                try {
                    // Buscar dados do usuário
                    const userRef = ref(realtimeDb, `users/${userId}`);
                    const userSnapshot = await get(userRef);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.val();
                        setDados({  
                            email: userData.email || 'Email não disponível',
                            name: userData.name || 'Nome não disponível'
                        });
                    } else {
                        console.log('Nenhum dado disponível');
                    }

                    // Buscar dados dos sensores
                    const dbRef = ref(realtimeDb, 'sensores/correnteG');
                    const unsubscribe = onValue(dbRef, (snapshot) => {
                        const data = [];
                        snapshot.forEach((childSnapshot) => {
                            const itemString = childSnapshot.val();
                            const item = JSON.parse(itemString);
                            const timestamp = new Date(item.timestamp); 
                            const corrente = parseFloat(item.corrente);
                            data.push({
                                id: childSnapshot.key,
                                corrente: !isNaN(corrente) ? corrente : 0, 
                                timestamp,
                            });
                        });
                        
                        const organizedData = organizeDataByMonth(data);
                        setHistorico(organizedData);
                    });

                    return () => unsubscribe();

                } catch (error) {
                    console.error('Erro ao buscar dados: ', error);
                }
            };
            fetchData();
        }
    }, [userId]);
    
    const organizeDataByMonth = (data) => {
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const currentYear = new Date().getFullYear();
    
        const result = monthNames.map((monthName, index) => {
            const month = index + 1; // O índice do array começa em 0, por isso somamos 1
            const monthlyData = data.filter(item => {
                const date = item.timestamp;
                return date.getMonth() + 1 === month && date.getFullYear() === currentYear;
            });
    
            const totalCorrente = monthlyData.reduce((sum, item) => sum + (item.corrente || 0), 0); // Soma a corrente, garantindo que o valor seja numérico
    
            return { mes: monthName, totalCorrente: totalCorrente }; // Retorna o nome do mês e o consumo total
        });
    
        return result;
    };


    function logout() {
        signOut(auth)
            .then(() => {
                navigation.replace('Login'); 
            })
            .catch((error) => {
                console.error('Error during sign out: ', error);
            });
    }

    const renderItem = ({ item }) => (
        <View>                
            
            <View style={styles.tabelaid}>
                <Text style={styles.tabdados}>{`${item.mes} `}</Text> 
                <Text style={styles.tabdados}>
                    {item.totalCorrente !== undefined && !isNaN(item.totalCorrente)
                        ? `Consumo total: ${item.totalCorrente.toFixed(2)}`
                        : '-'}
                </Text>
              
            </View>
        </View>
    );

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
