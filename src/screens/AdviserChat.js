import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const AdviserChat = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const API_KEY = 'AIzaSyA3bnhZ18pP_arSLqPW-QinViUsb4N-Nh8';
  const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  // ✅ Auto welcome message when screen loads
  useEffect(() => {
    const welcomeMessage = {
      role: 'bot',
      text: '👋 Welcome to admission.ac! How may we help you?',
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ role: 'user', parts: [{ text: input }] }],
        },
        { headers: { 'Content-Type': 'application/json' }, timeout: 20000 }
      );

      const reply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response';

      const botMessage = { role: 'bot', text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.log('Gemini API error status:', status);
      console.log('Gemini API error data:', JSON.stringify(data));
      let message = '⚠️ Server error. Please try again later.';
      if (status === 401 || status === 403) message = '⚠️ Invalid or unauthorized API key.';
      if (status === 429) message = '⚠️ Rate limit exceeded. Please wait a moment.';
      setMessages((prev) => [...prev, { role: 'bot', text: message }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          }}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adviser Chat</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Chat Section */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top + 60}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[styles.messageContainer, { paddingBottom: 10 + insets.bottom }]}
          showsVerticalScrollIndicator={false}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.botBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  msg.role === 'user' ? styles.userText : styles.botText,
                ]}>
                {msg.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputContainer, { paddingBottom: 10 + insets.bottom }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.input}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: loading ? '#A9A9A9' : '#2B2A29' },
            ]}
            onPress={sendMessage}
            disabled={loading}>
            <Ionicons
              name={loading ? 'time-outline' : 'send'}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  messageContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
    marginVertical: 4,
    maxWidth: '75%',
    backgroundColor:'#F1FEE7',
    borderWidth:1,
    borderColor:'#F1FEE7'

  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FCECBB',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1FEE7',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userText: { color: '#000' },
  botText: { color: '#333' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    maxHeight: 120,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    color: '#000',
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 50,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdviserChat;
