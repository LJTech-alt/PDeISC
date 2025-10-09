import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Welcome: { name: string; username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Ingreso' }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenida' }} />
    </Stack.Navigator>
  );
}
