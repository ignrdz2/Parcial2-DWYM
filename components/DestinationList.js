import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Platform, Dimensions } from 'react-native';
import config from '../config';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DestinationList({ navigation }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.backendUrl}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) {
            return a.name.localeCompare(b.name);
          }
          return a.isFavorite ? -1 : 1;
        });
        setDestinations(sortedData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id, isFavorite) => {
    fetch(`${config.backendUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: !isFavorite })
    }).then(() => {
      setDestinations(prevDestinations => {
        const updatedDestinations = prevDestinations.map(destination =>
          destination.id === id ? { ...destination, isFavorite: !isFavorite } : destination
        );
        const sortedData = updatedDestinations.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) {
            return a.name.localeCompare(b.name);
          }
          return a.isFavorite ? -1 : 1;
        });
        return sortedData;
      });
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error al cargar los destinos: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[...destinations, { id: 'add-button' }]}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          if (item.id === 'add-button') {
            return <Button title="Agregar Destino" onPress={() => navigation.navigate('AddDestination')} />;
          }
          return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DestinationDetails', { destination: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={[styles.difficulty, styles[item.difficulty.toLowerCase()]]}>{item.difficulty}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id, item.isFavorite)}>
                {Platform.OS === 'android' ? (
                  <Icon
                    name="star"
                    size={24}
                    style={[styles.favorite, item.isFavorite ? styles.favoriteAndroid : styles.notFavoriteAndroid]}
                  />
                ) : (
                  <Icon
                    name="heart"
                    size={24}
                    style={[styles.favorite, item.isFavorite ? styles.favoriteIOS : styles.notFavoriteIOS]}
                  />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  info: {
    flex: 1
  },
  text: {
    fontSize: 18
  },
  difficulty: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center'
  },
  easy: {
    backgroundColor: 'green'
  },
  medium: {
    backgroundColor: 'yellow'
  },
  hard: {
    backgroundColor: 'purple'
  },
  favorite: {
    fontSize: 24,
    marginLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12
  },
  favoriteAndroid: {
    color: 'yellow'
  },
  notFavoriteAndroid: {
    color: 'transparent'
  },
  favoriteIOS: {
    color: 'red'
  },
  notFavoriteIOS: {
    color: 'transparent'
  }
});