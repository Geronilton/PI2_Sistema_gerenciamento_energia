import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, get, query, orderByKey, limitToLast } from 'firebase/database';
import { realtimeDb } from '../../../services/firebaseConfig';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Home() {

  const [ultimoDado, setUltimoDado] = useState(null);

  // Função para pegar o último dado do Realtime Database
  const pegarUltimoDadoDoFirebase = async (caminho) => {
    try {
      // Cria a query para ordenar por chave e limitar a 1 resultado
      const dadoRef = query(ref(realtimeDb, caminho), orderByKey(), limitToLast(1));
      
      // Executa a consulta e pega o snapshot dos dados
      const snapshot = await get(dadoRef);
      const dados = snapshot.val();  // Pega os dados do snapshot
  
      if (dados) {
        const ultimoDado = Object.values(dados)[0];  // Pega o primeiro (e único) valor da lista de dados
        console.log("Último dado:", ultimoDado);
        return ultimoDado;
      }
  
      return null;  // Retorna null se não houver dados
    } catch (error) {
      console.error("Erro ao buscar o último dado do Firebase: ", error);
      return null;  // Retorna null em caso de erro
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await pegarUltimoDadoDoFirebase("sensores/correnteG");  // Passa o caminho do dado
      setUltimoDado(resultado);  // Atualiza o estado com o dado recebido
      console.log(resultado);
    };

    fetchData();  // Chama a função para buscar os dados
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text className="Home">
            
          </Text>
        <Text style={styles.Text_box}>R$: 9.999,99</Text>
          <Text style={styles.Text_box}>{ultimoDado}</Text>

      </View>
      
      
      
      <View style={styles.box_1}>
      <LineChart
    data={{
      labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      datasets: [
        {
          data: [
            
            ultimoDado
          
          ]
        }
      ]
    }}
    width={355} // from react-native
    height={170}
    yAxisLabel="W "
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    const chartConfig = {{
      backgroundGradientFrom: "transparent",
      backgroundGradientFromOpacity: 20,
      backgroundGradientTo: "transparent",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(255, 255, 255, 0.8), ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
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
        {/* <BarChart
          data = {{
            labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            datasets: [
              {
                data: [10, 45, 28, 80, 99, 43, 30]
              }
            ]
          }}
          width={375}
          height={170}
          strokeWidth={16}
          radius={32}
          const chartConfig = {{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, 0.8), ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            alignItems: 'center',
            marginVertical: 15
          }}
          hideLegend={false}
        /> */}
        <StackedBarChart
          
          data = {{
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
          chartConfig = {{
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
