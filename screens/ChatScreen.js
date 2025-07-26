import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { OPENAI_API_KEY } from '@env';
const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! What would you like to learn today?" }
  ]);
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState('');

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');

    // Simulated bot response
    setTimeout(() => {
      const reply = generateBotReply(text);
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 500);
  };

 const generateBotReply = async (text) => {
  const topicPrompts = {
    bitwise: "You are a programming tutor helping a beginner understand bitwise operations. Use simple explanations and short code examples.",
    linkedlist: "You are a programming tutor teaching linked lists. Be friendly and show visual examples using text.",
    recursion: "You are teaching recursion to a beginner. Use analogies and start with factorial and Fibonacci."
  };

  const systemPrompt = topicPrompts[topic] || "You are a helpful programming tutor.";

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text }
    ],
    temperature: 0.7
  };

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_API_KEY}`,
  "HTTP-Referer": "https://localhost",
  "X-Title": "GamifiedDSAApp"
},
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log("OpenAI full response:", JSON.stringify(data, null, 2));

    // ✅ Return the actual content of the assistant's reply
    return data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("OpenAI error:", error);
    return "There was an error connecting to the AI.";
  }
};

  const selectTopic = (selected) => {
    setTopic(selected);
    sendMessage(`I want to learn about ${selected}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map((msg, i) => (
          <Text
            key={i}
            style={[
              styles.message,
              msg.from === 'bot' ? styles.botMessage : styles.userMessage,
            ]}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      {!topic && (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.topicButton} onPress={() => selectTopic('bitwise')}>
            <Text style={styles.buttonText}>Bitwise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicButton} onPress={() => selectTopic('linkedlist')}>
            <Text style={styles.buttonText}>Linked List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topicButton} onPress={() => selectTopic('recursion')}>
            <Text style={styles.buttonText}>Recursion</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your question..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage(input)}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  chat: { flex: 1, marginBottom: 10 },
  message: { marginVertical: 4, padding: 10, borderRadius: 10, maxWidth: '80%' },
  botMessage: { backgroundColor: '#e2e8f0', alignSelf: 'flex-start' },
  userMessage: { backgroundColor: '#38bdf8', color: '#fff', alignSelf: 'flex-end' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, padding: 10, backgroundColor: '#fff', borderRadius: 8, marginRight: 8 },
  sendBtn: { backgroundColor: '#0ea5e9', padding: 10, borderRadius: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  topicButton: { backgroundColor: '#22d3ee', padding: 10, borderRadius: 10 },
  buttonText: { color: '#0f172a', fontWeight: 'bold' },
});

export default ChatScreen;