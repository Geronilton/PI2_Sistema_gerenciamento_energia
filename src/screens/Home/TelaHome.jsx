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

    function calcularCustoEnergia(ultimoDado, precoPorKWh = 0.88) {
      const tensao = 220; // Tensão em Volts
      const tempo = 1;  // Tempo em horas

      // Transformar mha em amper

      const corrente = ultimoDado / 1000;
    
      // Calcula a potência em kW (P = V * I)
      const potenciaKW = ( corrente * tensao) / 1000;
    
      // Calcula o consumo de energia em kWh (P * t)
      const consumoKWh = potenciaKW * tempo;
    
      // Calcula o custo em reais
      const custoReais = consumoKWh * precoPorKWh;
    
      return custoReais;
    }
    const custo = calcularCustoEnergia(ultimoDado);
    


  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text className="Home"></Text>
          <Text style={styles.Text_box}>
            {ultimoDado !== null ? `Corrente:  ${ultimoDado}⚡` : "Nenhum dado disponível"}
          </Text>
          <Text style={styles.Text_box}>O custo é R$: {custo.toFixed(2)}</Text>

      </View>
      
      <View style={styles.box_1}>
      <Text style={styles.Text}>Media</Text>
        
      <StackedBarChart
          data={{
            labels: ["ALTO", "MEDIO", "BAIXO", "real"],
            data: [
              [21000],
              [14000],
              [8000],
              [ ultimoDado !== null && !isNaN(ultimoDado) ? ultimoDado : 0 ]
          
            ],
            barColors: [ "#9da3ae" ]
          }}
          width={340}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#5f6ab0",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#5f6ab0",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            alignItems: 'center',
          }}
        />
        
      </View>
      <View style={styles.box_2}>
        <Text style={styles.Text}>Semanal</Text>
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
          height={190}
          yAxisLabel="W "
          yAxisInterval={1} 
          chartConfig={{
            backgroundGradientFrom: "#5f6ab0",
            backgroundGradientFromOpacity: 2,
            backgroundGradientTo: "#5f6ab0",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, 
            barPercentage: 0.5,
            useShadowColorFromDataset: false 
          }}
          bezier
          style={{
            borderRadius: 16,
            alignItems: 'center',
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
    color: "white",
    textAlign: 'center'
  },
  Text_box: {
    fontSize: 20,
    textAlign: 'center'
  },
  box:{
    height: 150,
    width: 360,
    backgroundColor: '#c6c6c6',
    borderRadius: 10

  },
  box_1:{
    height: 230,
    width: 360,
    backgroundColor: '#5f6ab0',
    margin: 30,
    borderRadius: 20
  },
  box_2:{
    height: 230,
    width: 360,
    backgroundColor: '#5f6ab0',
    borderRadius: 20
  }
});
