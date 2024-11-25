import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import config from '../config';

export default function DestinationDetails({ route, navigation }) {
  const { destination } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <Text style={styles.name}>{destination.name}</Text>
      <Text style={styles.description}>{destination.description}</Text>
      <Text style={styles.difficulty}>Dificultad: {destination.difficulty}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => navigation.navigate('EditDestination', { destination })} />
        <Button title="Eliminar" onPress={() => {
          fetch(`${config.backendUrl}/${destination.id}`, { method: 'DELETE' })
            .then(() => navigation.navigate('DestinationList'));
        }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    maxWidth: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
    marginTop: 20
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  difficulty: {
    fontSize: 16,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20
  }
});