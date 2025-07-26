import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuizScreen({ route }) {
  const { difficulty } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧠 Quiz - {difficulty.toUpperCase()} mode</Text>
      <Text style={styles.text}>Questions coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 10 },
});