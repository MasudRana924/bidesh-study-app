import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simple network check using fetch
    const checkNetwork = async () => {
      try {
        const response = await fetch('https://www.google.com', { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    // Check network status every 30 seconds
    const interval = setInterval(checkNetwork, 30000);
    checkNetwork(); // Initial check

    return () => clearInterval(interval);
  }, []);

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default NetworkStatus;
