import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import styles from './style/style_Cad_Login';

export default function CadastroUser({ navigation }) {

  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const Cadastrar = async () => {
  //     try {
  //       const data ={
  //         name,
  //         email,
  //         password
  //       }
  //         // Enviar os dados para o servidor local
  //       const response = await api.post('/register',data);
  //       if (response.status === 200){
  //         alert('Usuário criado com sucesso!');
  //       }
  //         // Limpar os campos do formulário após o envio
  //         setNome('');
  //         setEmail('');
  //         setPassword('');
  //     } catch (error) {
  //         console.error('Erro ao criar usuário:', error);
  //         alert('Erro ao criar usuário');
  //     }
  // };

  return (
    <View style={styles.ScreenContainer}>

      <View style={styles.container}>
        <Text style={styles.titleCadastro}>Cadastre-se</Text>

        <TextInput style={styles.formTextInput}
          value={name}
          onChangeText={nome => setNome(nome)}
          placeholder='Nome'
        />


        <TextInput style={styles.formTextInput}
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder='Email'
        />

        <TextInput style={styles.formTextInput}
          value={password}
          onChangeText={senha => setPassword(senha)}
          placeholder='Senha'
        />

        <TextInput style={styles.formTextInput}
          value={password}
          onChangeText={senha => setPassword(senha)}
          placeholder='Confirme sua Senha'
        />

        <View style={styles.botaoSession}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Login') }}>
            <Text style={{fontSize:15}}>Ja Possui uma conta? Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao}
          onPress={() => { navigation.navigate('Menu') }}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}