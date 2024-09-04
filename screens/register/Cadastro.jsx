import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import styles from './style/style_Cad_Login';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function CadastroUser({ navigation }) {

  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      
      await setDoc(doc(db, 'users',userId), {
        name: name,
        email: email,
      });

      setNome('');
      setEmail('');
      setPassword('');

      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      navigation.navigate('Login');
      console.log('Documento criado no Firestore para o usuário:', userId);

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

        <TouchableOpacity style={styles.botao}
          onPress={handleCreateUser}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.botaoSession}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Login') }}>
            <Text style={{ fontSize: 15 }}>Ja Possui uma conta? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}