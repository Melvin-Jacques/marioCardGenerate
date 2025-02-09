import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/jamboree_bg.png')}
      style={styles.background}
    >
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/fr/9/94/Super_Mario_Party_Jamboree_Logo.png' }}
        style={styles.logo}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue</Text>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => navigation.navigate('CardGeneration')}
        >
          <Text style={styles.buttonText}>Générer une carte</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#48dbb1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
