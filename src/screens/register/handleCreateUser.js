import { Alert } from "react-native";

export const handleCreateUser = async (auth, realtimeDb, name, email, password, password2, setNome, setEmail, setPassword, setPassword2) => {

    if(!name || !email || !password){
      Alert.alert('Erro', 'Preencha todos os campos')
    }
    else if (password != password2){
      Alert.alert('Erro', 'As senhas não conferem')
    }else{
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
  
        // Enviando dados para o Realtime Database
        await set(ref(realtimeDb, 'users/' + userId), {
          name: name,
          email: email,
        });
  
        setNome('');
        setEmail('');
        setPassword('');
        setPassword2('');
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
  
        console.log('Dados enviados para o Realtime Database para o usuário:', userId);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    }
  };
