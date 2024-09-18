import { handleCreateUser } from '../../../src/screens/register/handleCreateUser';
import { Alert } from 'react-native';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  set: jest.fn(),
  ref: jest.fn(),
}));

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('handleCreateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir um alerta de erro se os campos não estiverem preenchidos', async () => {
    await handleCreateUser(
      null, // auth
      null, // realtimeDb
      '',   // name
      '',   // email
      '',   // password
      '',   // password2
      jest.fn(), // setNome
      jest.fn(), // setEmail
      jest.fn(), // setPassword
      jest.fn()  // setPassword2
    );

    expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Preencha todos os campos');
  });

  it('deve exibir um alerta de erro se as senhas não conferirem', async () => {
    await handleCreateUser(
      null, // auth
      null, // realtimeDb
      'Usuário', 
      'user@example.com', 
      '123456', 
      '123', 
      jest.fn(), // setNome
      jest.fn(), // setEmail
      jest.fn(), // setPassword
      jest.fn()  // setPassword2
    );

    expect(Alert.alert).toHaveBeenCalledWith('Erro', 'As senhas não conferem');
  });

});
