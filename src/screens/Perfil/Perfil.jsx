import { Text, View, FlatList, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './style/MyStyle';
import { db } from '../../../services/firebaseConfig';
import { ref, onValue } from "firebase/database";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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
  
const DATA = [
    {
        id: 1,
        nome: 400.0,
    },
    {
        id: 2,
        nome: 200.0,
    },
    {
        id: 3,
        nome: 500.0,
    },
];

const Item = ({ id, nome }) => {
    return (
        <View style={styles.tabelaid}>
            <Text style={styles.tabdados}>{id}</Text>
            <Text style={styles.tabdados}>{nome}</Text>
        </View>
    );
};

export default function Perfil() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const usuariosRef = ref(db, 'Usuario');
        const unsubscribe = onValue(usuariosRef, (snapshot) => {
            const data = [];
            snapshot.forEach((childSnapshot) => {
                data.push(childSnapshot.val());
            });
            setDados(data);
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.perfil}>
                <View style={styles.logo}>
                    <Image style={styles.image} source={require('../../images/ClaraOswald.jpg')} />
                </View>

                {dados.map((usuario, index) => {
                    return(
                    <View style={styles.nome} key={index}>
                        <Text style={styles.titlename}>{usuario.nome}</Text>
                    </View>     
                    )
                })}
            </View>
            <View style={styles.info}>
                <Text style={styles.dados}>Email:</Text>
                {dados.map((usuario, index) => {
                    return(
                        <View  key={index}>
                            <Text style={styles.text}>{usuario.email}</Text>
                        </View>
                    )
                })}
            </View>

            <View>
                <Text style={styles.historico}>Histórico de Consumo</Text>
            </View>
            <Text style={styles.historico}>Data</Text>
            <View style={styles.tabela}>
            <PieChart data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
            />
            
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item nome={item.nome} id={item.id}/>}
                    keyExtractor={item => item.id.toString()}
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
