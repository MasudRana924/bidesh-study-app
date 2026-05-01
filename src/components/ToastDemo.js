import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { CustomToast } from '../shared';

const ToastDemo = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={2000}
        onHide={hideToast}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Toast Demo</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.errorButton]}
          onPress={() => showToast('Invalid or expired OTP', 'error')}
        >
          <Text style={styles.buttonText}>Show Error Toast</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={() => showToast('OTP verified successfully!', 'success')}
        >
          <Text style={styles.buttonText}>Show Success Toast</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={() => showToast('Please check your email for OTP', 'info')}
        >
          <Text style={styles.buttonText}>Show Info Toast</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: '#EF4444',
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  infoButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ToastDemo;
