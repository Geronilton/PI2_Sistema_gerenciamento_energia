import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/register/Login';
import Cadastro from  './screens/register/Cadastro';
import TelaTomadas from './screens/outlet/TelaTomadas';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from './src/components/Perfil/Perfil';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Menu() {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />
      

    </Tab.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
      
      {!user ? (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

