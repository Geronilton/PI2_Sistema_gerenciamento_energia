import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
<<<<<<< HEAD

import Login from './screens/register/Login';
import Cadastro from  './screens/register/Cadastro';
import TelaTomadas from './screens/outlet/TelaTomadas';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from './src/components/Perfil/Perfil';
=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './src/components/LoadingScreen';
import Login from './src/screens/register/Login';
import Cadastro from  './src/screens/register/Cadastro';
import TelaTomadas from './src/screens/outlet/TelaTomadas';
import Perfil from './src/screens/Perfil/Perfil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
>>>>>>> 324bac7168552900abb861d16584dd8f64768ac6

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Menu() {
  return (
    <Tab.Navigator > 
      <Tab.Screen
        name="Tomadas"
        component={TelaTomadas}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />; 
  }


  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Tab.Navigator initialRouteName='Cadastro'>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="TelaTomadas" component={TelaTomadas} />
      </Tab.Navigator>
=======
>>>>>>> 324bac7168552900abb861d16584dd8f64768ac6
      <Stack.Navigator initialRouteName="Cadastro">
      {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login} 
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

