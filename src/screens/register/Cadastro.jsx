import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import styles from './style/style_Cad_Login';
import Logo from '../../images/Logo.png'
import { auth, db } from '../../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function CadastroUser({ navigation }) {

  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');


  const handleCreateUser = async () => {

    if(!name || !email || !password){
      Alert.alert('Erro', 'Preencha todos os campos')
    }
    else if (password != password2){
      Alert.alert('Erro', 'As senhas não conferem')
    }else{
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
      setPassword2('');
      navigation.navigate('Login');
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      
      console.log('Documento criado no Firestore para o usuário:', userId);

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }
  };

  return (
    <View style={styles.ScreenContainer}>

      <View style={styles.container}>

      <Image
        source={Logo}
        style={{ width: 200, height: 200 }}
        resizeMode="contain" 
        />

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
          secureTextEntry={true}
        />

         <TextInput style={styles.formTextInput}
          value={password2}
          onChangeText={senha => setPassword2(senha)}
          placeholder='Confirme sua Senha'
          secureTextEntry={true}
        /> 

        <TouchableOpacity style={styles.botao}
          onPress={handleCreateUser}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.botaoSession}>
          <>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Login') }}>
            <Text style={{ fontSize: 15 }}>Ja possui uma conta? Login</Text>
          </TouchableOpacity>
          </>
        </View>
      </View>
    </View>
  );
}