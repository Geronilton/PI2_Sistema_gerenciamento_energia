import { Text, View, FlatList, Button, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../style/MyStyle';

const DATA = [
    {
        id: 1,
        nome: 400.0,
    },
];

const Item = ({ id, nome }) => {
    return (
        <View style={styles.tabela}>
            <Text style={styles.dados}>{id}</Text>
            <Text style={styles.dados}> {nome}</Text>
        </View>
    );
};

export default function Perfil({ navigation }) {
    const [nome, setNome] = useState('');
    const [id, setId] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.perfil}>
                <View style={styles.logo}>
                    <Image style={styles.image} source={require('../../images/ClaraOswald.jpg')} />
                </View>
                <View style={styles.nome}>
                    <Text style={styles.titlename}>Clara Oswald</Text>
                </View>  
            </View>

            <View style={styles.info}>
                <Text style={styles.dados}>Email:</Text>
                <Text style={styles.text}>claraoswald@gmail.com</Text>
            </View>

            <View>
                <Text style={styles.historico}>Histórico de Consumo</Text>
            </View>
            <Text style={styles.tabdados}>Data</Text>
            <View style={styles.tabela}>
                <FlatList
                    
                    data={DATA}
                    renderItem={({ item }) => <Item nome={item.nome} id={item.id}/>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
}
