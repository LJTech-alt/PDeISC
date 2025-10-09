import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ route }) => {
  const { name, username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido, {name}!</Text>
      <Text style={styles.subtitle}>Usuario: {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold' },
  subtitle: { marginTop: 8, fontSize: 18 }
});

export default WelcomeScreen;
