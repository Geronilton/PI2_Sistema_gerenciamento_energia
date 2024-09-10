import { Text, View, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style/MyStyle';
import { db } from '../../../services/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { PieChart } from "react-native-chart-kit";
import { getAuth } from 'firebase/auth';

const screenWidth = Dimensions.get("window").width;

const data = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

export default function Perfil() {
    const [dados, setDados] = useState({});
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

    return (
        <View style={styles.container}>
            <View style={styles.perfil}>
                <View style={styles.logo}>
                    <Image style={styles.image} source={require('../../images/ClaraOswald.jpg')} />
                </View>

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
            <Text style={styles.historico}>Data</Text>
            <View style={styles.tabela}>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />
            </View>
        </View>
    );
}

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
