import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  placeholder,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && (
          <View style={styles.iconContainer}>
            <Icon name={icon} size={24} color="#1F1F1F" />
          </View>
        )}
        <TextInput
          style={[styles.textInput, icon && styles.textInputWithIcon, error && styles.textInputError]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          blurOnSubmit={false}
          placeholder={placeholder || label}
          placeholderTextColor="#9CA3AF"
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={20} 
              color="#9CA3AF" 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    position: 'relative', 
    marginVertical: 8,
    marginBottom: 16,
  },
  inputContainer: { position: 'relative', flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    position: 'absolute',
    left: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E4E7E9',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  textInputWithIcon: {
    paddingLeft: 56,
  },
  textInputError: {
    borderColor: '#EF4444',
  },
  eyeIcon: { 
    position: 'absolute', 
    right: 16, 
    height: 56, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 28,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default FloatingLabelInput;
