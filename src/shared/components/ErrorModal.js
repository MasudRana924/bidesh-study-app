import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorModal = ({ visible, error, onClose, appName = "BideshStudy" }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>{appName}</Text>
          
          {/* Error Message */}
          <Text style={styles.errorMessage}>{error}</Text>
          
          {/* Okay Button */}
          <TouchableOpacity style={styles.okayButton} onPress={onClose}>
            <Text style={styles.okayButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F1F1F',
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1F1F1F',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  okayButton: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okayButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#03BC00',
  },
});

export default ErrorModal;
