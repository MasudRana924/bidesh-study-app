import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LanguageSwitch = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageToggle = () => {
    const newLanguage = selectedLanguage === 'en' ? 'bn' : 'en';
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.languageOption,
          selectedLanguage === 'en' && styles.activeLanguage
        ]}
        onPress={() => handleLanguageToggle('en')}
      >
        <Text style={[
          styles.languageText,
          selectedLanguage === 'en' && styles.activeLanguageText
        ]}>
          EN
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.languageOption,
          selectedLanguage === 'bn' && styles.activeLanguage
        ]}
        onPress={() => handleLanguageToggle('bn')}
      >
        <Text style={[
          styles.languageText,
          selectedLanguage === 'bn' && styles.activeLanguageText
        ]}>
          BN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    padding: 4,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 45,
  },
  activeLanguage: {
    backgroundColor: '#03BC00',
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7A7A7D',
  },
  activeLanguageText: {
    color: '#FFFFFF',
  },
});

export default LanguageSwitch;
