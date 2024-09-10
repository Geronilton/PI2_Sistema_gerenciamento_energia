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
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Cadastro'>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="TelaTomadas" component={TelaTomadas} />
      </Tab.Navigator>
      <Stack.Navigator initialRouteName="Cadastro">
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

        <Stack.Screen 
        name="Menu" 
        component={Menu} 
        options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

