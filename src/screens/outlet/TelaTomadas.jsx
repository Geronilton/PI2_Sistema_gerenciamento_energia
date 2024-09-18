import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, Modal, FlatList, TextInput, Pressable, StyleSheet, Button } from "react-native";
import { getDatabase, ref, set, get, push, remove, onValue } from 'firebase/database';
import Styles from "./Style/MyStyles_tomadas";
import {realtimeDb } from "../../../services/firebaseConfig";
//import {db} from "../../../Data-base";

export default function TelaTomadas() {
    const TOMADA = [];
    const [modalVisible, setModalVisible] = useState(false);
    const [equipamento, setEquipamento] = useState('');
    //const [contador, setContador] = useState(1);
    const [tomada, setTomada] = useState(TOMADA);
    const [releState, setReleState] = useState('OFF');
    const [ultimoId, setUltimoId] = useState(0);

    // Função para buscar o estado inicial do relé do Realtime Database
    const fetchReleState = async () => {
        try {
            const stateRef = ref(realtimeDb, 'rele/estado');
            const snapshot = await get(stateRef);
            if (snapshot.exists()) {
                setReleState(snapshot.val());
            } else {
                console.log("Documento não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao buscar estado do relé:", error);
        }
    };

    useEffect(() => {
        fetchReleState(); // Buscar o estado inicial quando o componente for montado
    }, []);

    // Função para alternar o estado do relé
    const toggleRele = async () => {
        const newState = releState === 'ON' ? 'OFF' : 'ON';
        setReleState(newState);

        // Atualizar o estado do relé no Realtime Database
        try {
            await set(ref(realtimeDb, 'rele/estado'), newState);
            console.log(`Relé alterado para: ${newState}`);
        } catch (error) {
            console.error('Erro ao atualizar estado do relé:', error);
        }
    };

     
    const cadastrarTomada = async () => {
        if (!equipamento.trim()) {
            alert('por favor, insira o nome do equipamento.');
            return;
        }
        const novoID = ultimoId + 1;
        const novaTomada = {
            //id: contador.toString(),
            equipamento: equipamento,
            watts: '100',
            kwh: '0.5',
            estado: false,
        };

        try {
            //const docRef = await addDoc(collection(db, 'tomada'), novaTomada);
            const tomadaRef = ref(realtimeDb, `Tomada/${novoID}`);
            const novaTomadaRef = push(tomadaRef);
            await set(novaTomadaRef, novaTomada);

            console.log(`Tomada cadastrada com sucesso com ID: ${novoID}`);

            setTomada([...tomada,{ ...novaTomada, id:novoID }]);
            //setContador(contador + 1);
            setModalVisible(false);
            setEquipamento('');
            setUltimoId(novoID);
        } catch (e) {
            console.error("Erro ao adicionar a tomada", e);
        }
    };

    const excluirTela = async (id) => {
        try { 
            //await deleteDoc(doc(db, "tomada", id));
            const tomadaRef = ref(realtimeDb, `tomada/${id}`);
            await remove(tomadaRef);

            setTomada(tomada.filter(item => item.id !==id));
            console.log("tomada excluida com sucesso !!!");
        } catch (e) {
            console.error("Erro ao excluir sua tomada ID: ", e);
        }
    };

    const botaoONOFF = async (id) => {
        const tomadaAtual = tomada.find(item => item.id === id);
        const novoEstado = !tomadaAtual.estado;

        try {
            const tomadaRef = ref(realtimeDb, `tomada/${id}`);

            await update(tomadaRef, {
                estado: novoEstado,
            //await updateDoc(doc(db, "tomadas", id), {
            //    estado: novoEstado,
            });
            setTomada(tomada.map(item => 
                item.id === id ? { ...item, estado: novoEstado} : item
            ));

            console.log(tomada, "Tomada atualizada com sucesso!!!");
        } catch (e) {
            console.error("Erro ao atualizar a tomada", e);
        }
    };

    const renderItem = ({ item }) => (
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
                        style={[Styles.botaoTomada1, { backgroundColor:releState === 'ON'? 'red' : 'green'}]}
                        onPress={toggleRele}
                        >
                        <View>
                            <Text style={styles.textBotao}>{`${releState === 'ON' ? 'OFF' : 'ON'}`}</Text>
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

    const buscarTomada = () => {
        const tomadaRef = ref(realtimeDb, 'Tomada/');
        onValue(tomadaRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const listaTomadas = Object.keys(data).map(key => ({
                    id: parseInt(key),
                    ...data[key]
                }));
                setTomada(listaTomadas);

                const maiorID = Math.max(...listaTomadas.map(item => item.id), 0);
                setUltimoId(maiorID);
            } else {
                setTomada([ ]);
                setUltimoId(0);
            }
        });
    };

    useEffect(() => {
        buscarTomada();
    }, []);

    return (
        <View style={Styles.container}>
            <View style={Styles.textoTomada}>
                <Text>TOMADAS</Text>
            </View>
            <FlatList
                data={tomada}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <View>
                <TouchableOpacity
                    style={Styles.botao_Tomada}
                    onPress={() => setModalVisible(true)}
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
                                onPress={cadastrarTomada}
                            >
                                <Text style={styles.textStyle}>Cadastrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        width: '100%',
        paddingHorizontal: 10,
    }
});
