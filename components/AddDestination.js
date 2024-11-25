import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import config from '../config';

export default function AddDestination({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSubmit = () => {
    const newDestination = {
      name,
      description,
      difficulty,
      isFavorite: false
    };

    fetch(`${config.backendUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDestination)
    }).then(() => navigation.navigate('DestinationList'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del destino</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <Text style={styles.label}>Descripción breve</Text>
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Nivel de dificultad</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioRow}>
          <RadioButton
            value="easy"
            status={difficulty === 'easy' ? 'checked' : 'unchecked'}
            onPress={() => setDifficulty('easy')}
          />
          <Text style={styles.radioLabel}>Easy</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton
            value="medium"
            status={difficulty === 'medium' ? 'checked' : 'unchecked'}
            onPress={() => setDifficulty('medium')}
          />
          <Text style={styles.radioLabel}>Medium</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton
            value="hard"
            status={difficulty === 'hard' ? 'checked' : 'unchecked'}
            onPress={() => setDifficulty('hard')}
          />
          <Text style={styles.radioLabel}>Hard</Text>
        </View>
      </View>
      <Button title="Agregar Destino" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    maxWidth: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
    marginTop: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  radioContainer: {
    marginBottom: 15
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  radioLabel: {
    marginLeft: 8
  }
});