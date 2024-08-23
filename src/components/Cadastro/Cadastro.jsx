import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native-web'

export default function CadastroUser () {
    return(
        <View>
            <Text>Cadastre-se</Text>
            <View>
                <TextInput  />
                <TextInput />
                <TextInput />
                <TextInput />
                <TouchableOpacity>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}