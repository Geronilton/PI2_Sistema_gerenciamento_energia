import React from "react";
import { TouchableOpacity, View, Text, Image, Modal, FlatList,TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

import Styles from "./Style/MyStyles_tomadas";

export default function TelaTomadas() {
    const TOMADA = [

    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [equipamento, setEquipamento] = useState('');
    const [contador, setContador] = useState(1);
    const [tomada, setTomada] = useState(TOMADA);

     
    const cadastrarTomada = () => {
        const novaTomada = {
            id: contador.toString(),
            equipamento: equipamento,
            watts: '100',
            kwh:'0.5',
            estado: false,
        };
        setTomada([...tomada, novaTomada]);
        setContador(contador + 1);
        setModalVisible(false);
    };

    const excluirTela = (id) => {
        setTomada(tomada.filter(item => item.id !==id));
    };

    const botaoONOFF = (id) => {
        setTomada(tomada.map(item => 
            item.id === id ? { ...item, estado: !item.estado} : item
        ));
    };

    const renderItem = ({item}) => (
        <View style={Styles.tomadaCadastrada}>
                <View style={Styles.tomadaId}>
                    <Image
                        style={Styles.imagemTomada}
                        source={require('../../images/tomada.png')}
                    />
                    <Text>{item.id}</Text>
                </View>
                <View style={Styles.containerInfoTomada}>
                    <Text>{item.equipamento}</Text>
                    <View style={Styles.tomadaCadastradaInfo}>
                        <Text>{item.watts} watts</Text>
                        <Text>{item.kwh} kwh</Text>
                    </View>
                </View>
                <View style={Styles.botaoTomada}>
                    <TouchableOpacity 
                        style={[Styles.botaoTomada1, { backgroundColor:item.estado ? 'green' : 'red'}]}
                        onPress={ () => botaoONOFF(item.id)}
                        >
                        <View>
                            <Text style={styles.textBotao}>{item.estado ? 'ON' : 'OFF'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={Styles.botaoTomada1}
                        onPress={() => excluirTela(item.id)}
                    >
                        <View>
                            <Text>EXCLUIR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    );

    return (
        <View style={Styles.container}>
            <View style={Styles.textoTomada}>
                <Text>TOMADAS</Text>
            </View>
            <FlatList
                data={tomada}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View>
                <TouchableOpacity
                    style={Styles.botao_Tomada}
                    onPress={() =>
                        setModalVisible(true)
                    }
                >
                    <Text>+</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>CADASTRAR TOMADA</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do Equipamento"
                                onChangeText={setEquipamento}
                                value={equipamento}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={cadastrarTomada}>
                                <Text style={styles.textStyle}>Cadastrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    textBotao: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
  });