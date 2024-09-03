import React, { useState } from 'react'
import { auth, database } from '../../services/firebaseConfig';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import styles from './style/style_Cad_Login';

export default function CadastroUser({ navigation }) {

  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      // Cria o usuário com email e senha
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Salva informações adicionais no Firestore
      await firestore().collection('users').doc(user.uid).set({
        name: name,
        email: email,
      });

      Alert.alert('Sucesso', 'Usuário criado e salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      Alert.alert('Erro', error.message);
    }
  };
  
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

        {/* <TextInput style={styles.formTextInput}
          value={password}
          onChangeText={senha => setPassword(senha)}
          placeholder='Confirme sua Senha'
        /> */}

        <View style={styles.botaoSession}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Login') }}>
            <Text style={{fontSize:15}}>Ja Possui uma conta? Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao}
          onPress={handleCreateUser}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}