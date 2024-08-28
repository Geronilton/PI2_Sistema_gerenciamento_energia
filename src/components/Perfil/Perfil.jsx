import { Text, View, ScrollView, FlatList, Button, Image } from 'react-native';
import React, { useState } from 'react';

import styles from '../style/MyStyle';

const DATA = [
    {
        id: 1,
        nome: 400.0,
    },
];

const Item = ({ nome }) => {
    return (
        <View>
            <Text style={styles.dados} >{nome}</Text>
        </View>
    );
};

export default function Perfil({navigation}) {
    const [nome, setNome] = useState('')
    const [id, setid] = useState(0)
  return (
    <View style={styles.container}>
        <View style={styles.perfil}>
            <View style={styles.logo}>
                <Image style={styles.image} source={require('../../images/ClaraOswald.jpg')}/>
            </View>
            <View style={styles.nome}>
                <Text style={styles.text}>Clara Oswald</Text>
            </View>  
        </View>

        <View style={styles.info}>
            <Text style={styles.dados}>Email:</Text>
            <Text style={styles.text}>claraoswald@gmail.com</Text>
        </View>

            <View>
                <Text style={styles.dados}>Histórico de Consumo</Text>
            </View>
            <View>
                <Text style={styles.dados}>Data</Text>
                <ScrollView style={styles.tabela}>
                    <FlatList
                    data={DATA}
                    renderItem={({ item }) =>
                        <Item nome={item.nome} />}
                    keyExtractor={item => item.id}
                    />
                </ScrollView>
            </View>
            
            <View>
            <Button title='Home' onPress={() => 
                navigation.navigate('Home')}/>
                <Button title='Voltar' onPress={() => navigation.goBack()}/>
                <Button title='Tomadas' onPress={() => 
                navigation.navigate('Tomadas')}/>
                <Button title='Perfil' onPress={() => 
                navigation.navigate('Perfil')}/>
            </View>
    </View>
  );
}
