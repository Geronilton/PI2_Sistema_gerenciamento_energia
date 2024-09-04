import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import styles from './style/style_Cad_Login'
import Logo from '../../images/logoIcon.png'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebaseConfig';


export default function LoginUser({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Menu'); 
      }
    });
    return () => unsubscribe(); 
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        navigation.navigate('Menu');
      })
      .catch(error => {
        console.error('Erro detalhado:', error);
        let errorMessage;
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'O e-mail fornecido é inválido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Este usuário foi desativado.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Usuário não encontrado.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Senha incorreta.';
            break;
          default:
            errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
        Alert.alert('Erro de Autenticação', errorMessage);
      });

  }

  return (
    <View style={styles.ScreenContainer}>
      <View style={styles.container}>

        <Text style={styles.titleCadastro}>Entrar</Text>

        <TextInput style={styles.formTextInput}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder='Email'
        />

        <TextInput style={styles.formTextInput}
          value={password}
          onChangeText={pass => setPassword(pass)}
          placeholder='Senha'
        />

        <TouchableOpacity style={styles.botao}
          onPress={handleLogin}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

        <View style={styles.botaoSession}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Cadastro') }}>
            <Text style={{ fontSize: 15 }}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}