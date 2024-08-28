import React, {useState} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import styles from './style/style_Cad_Login'


export default function Login () {
  
    const [getLogin, setLogin] = useState('');
    const [getPass, setPass] = useState('');
  
    return (
      <View style={styles.ScreenContainer}>
        <View style={styles.container}>

        <Text style={styles.titleCadastro}>Entrar</Text>

          <TextInput style={styles.formTextInput}
            value={getLogin} 
            onChangeText={text => setLogin(text)} 
            placeholder='Email'
            />
  
          <TextInput style={styles.formTextInput}
            value={getPass} 
            onChangeText={pass => setPass(pass)}
            placeholder='Senha'
            />

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}