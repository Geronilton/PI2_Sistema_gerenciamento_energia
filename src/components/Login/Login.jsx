import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native-web'

export default function Login () {
    return(
        <View>
            <Text>Sessão</Text>
            <View>
                <TextInput  />
                <TextInput />
                <TouchableOpacity>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}