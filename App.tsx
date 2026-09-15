import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/context/AppContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetalhesTrechoScreen } from './src/screens/DetalhesTrechoScreen';
import { NovaOcorrenciaScreen } from './src/screens/NovaOcorrenciaScreen';
import { cores } from './src/theme/cores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: cores.primaria },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Painel Viário SP-021' }}
          />
          <Stack.Screen
            name="DetalhesTrecho"
            component={DetalhesTrechoScreen}
            options={{ title: 'Detalhes do Trecho' }}
          />
          <Stack.Screen
            name="NovaOcorrencia"
            component={NovaOcorrenciaScreen}
            options={{ title: 'Registro de Ocorrência' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}