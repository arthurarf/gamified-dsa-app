import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GameScreen({ navigation }) {
  const selectDifficulty = (level) => {
    navigation.navigate('Quiz', { difficulty: level });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Choose Difficulty</Text>

      <TouchableOpacity style={styles.button} onPress={() => selectDifficulty('easy')}>
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectDifficulty('medium')}>
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => selectDifficulty('hard')}>
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: '#38bdf8', padding: 15, borderRadius: 10, marginBottom: 10 },
  buttonText: { fontSize: 16, color: '#0f172a' },
});