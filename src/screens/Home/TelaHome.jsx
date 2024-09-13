import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, get, query, orderByKey, limitToLast, onValue } from 'firebase/database';
import { realtimeDb } from '../../../services/firebaseConfig';
import { LineChart, StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  
  const [ultimoDado, setUltimoDado] = useState(null);

  const pegarUltimoDadoEmTempoReal = (caminho) => {
    try {
      const dadoRef = query(ref(realtimeDb, caminho), orderByKey(), limitToLast(1));

      // Escuta as mudanças no banco de dados em tempo real
      onValue(dadoRef, (snapshot) => {
        const dados = snapshot.val();

        if (dados) {
          const [key] = Object.keys(dados);
          const ultimoDadoString = dados[key];
          const ultimoDado = JSON.parse(ultimoDadoString);

          if (ultimoDado && ultimoDado.corrente !== undefined) {
            console.log("Corrente recebida:", ultimoDado.corrente);
            setUltimoDado(ultimoDado.corrente); // Atualiza o estado com a corrente recebida
          } else {
            console.log("Corrente não encontrada.");
            setUltimoDado(null);
          }
        } else {
          setUltimoDado(null); // Se não houver dados, define como null
        }
      }, (error) => {
        console.error("Erro ao buscar o dado do Firebase: ", error);
      });
    } catch (error) {
      console.error("Erro ao buscar o dado em tempo real: ", error);
    }
  };

  useEffect(() => {
    pegarUltimoDadoEmTempoReal("sensores/correnteG"); // Pega os dados em tempo real do caminho específico
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text className="Home"></Text>
          <Text></Text>
          <Text style={styles.Text_box}>
            {ultimoDado !== null ? `Corrente: ${ultimoDado}A` : "Nenhum dado disponível"}
          </Text>

      </View>
      
      <View style={styles.box_1}>
        <LineChart
          data={{
            labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            datasets: [
              {
                data: [
                  ultimoDado !== null && !isNaN(ultimoDado) ? ultimoDado : 0 
                ]
              }
            ]
          }}
          width={355} 
          height={170}
          yAxisLabel="W "
          yAxisInterval={1} 
          chartConfig={{
            backgroundGradientFrom: "transparent",
            backgroundGradientFromOpacity: 20,
            backgroundGradientTo: "transparent",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, 
            barPercentage: 0.5,
            useShadowColorFromDataset: false 
          }}
          bezier
          style={{
            marginVertical: 15,
            borderRadius: 16,
            alignItems: 'center'
          }}
        />
      </View>
      <View style={styles.box_2}>
        <StackedBarChart
          data={{
            labels: ["Test1", "Test2"],
            legend: ["L1", "L2", "L3"],
            data: [
              [60, 60, 60],
              [30, 30, 60]
            ],
            barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
          }}
          width={300}
          height={170}
          chartConfig={{
            backgroundGradientFrom: "transparent",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "transparent",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            alignItems: 'center',
            marginVertical: 15,
            color: 'white',
            fontSize: 50
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
  },
  Text_box: {
    fontSize: 20,
    textAlign: 'center'
  },
  box:{
    height: 150,
    width: 335,
    backgroundColor: '#707984',
    borderRadius: 20
  },
  box_1:{
    height: 200,
    width: 360,
    backgroundColor: '#5f6ab0',
    margin: 30,
    borderRadius: 20
  },
  box_2:{
    height: 200,
    width: 360,
    backgroundColor: '#5f6ab0',
    borderRadius: 20
  }
});
