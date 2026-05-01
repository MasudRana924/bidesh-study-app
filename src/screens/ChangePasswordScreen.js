import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../shared';

const ChangePasswordScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState({ c: true, n: true, r: true });

  const onSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(t('changePasswordTitle'), t('passwordMismatch'));
      return;
    }
    // TODO: integrate with backend API
    Alert.alert(t('changePasswordTitle'), t('passwordUpdated'));
    navigation.goBack();
  };

  const PasswordField = ({ label, value, onChangeText, secureKey, placeholder, iconName }) => (
    <View style={styles.fieldWrapper}>
      <View style={styles.inputRow}>
        <Ionicons name={iconName} size={20} color="#7A7A7D" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure[secureKey]}
          placeholder={placeholder}
          placeholderTextColor="#7A7A7D"
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setSecure((s) => ({ ...s, [secureKey]: !s[secureKey] }))}>
          <Ionicons name={secure[secureKey] ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('changePasswordTitle')}</Text>
        <View style={styles.headerSpacer} />
      </View>
      <View>
        <Text style={styles.description}>{t('changePasswordDescription')}</Text>
      </View>

      <View style={styles.body}>
        <PasswordField label={t('currentPassword')} value={currentPassword} onChangeText={setCurrentPassword} secureKey="c" placeholder="Current Password" iconName="lock-closed" />
        <PasswordField label={t('newPassword')} value={newPassword} onChangeText={setNewPassword} secureKey="n" placeholder="New Password" iconName="lock-closed" />
        <PasswordField label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} secureKey="r" placeholder="Confirm Password" iconName="lock-closed" />

        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitText}>{t('updatePassword')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerBtn: { padding: 0 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSpacer: { width: 32 },
  description: { 
    fontSize: 16, 
    color: '#797979', 
    paddingHorizontal: 16, 
    marginBottom: 16 
  },
  body: { padding: 16 },
  fieldWrapper: { marginBottom: 14 },
  inputIcon: {
    marginLeft: 14,
    marginRight: 8,
    color:'#1F1F1F'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    height: 62,
  },
  input: { 
    flex: 1, 
    height: 62, 
    paddingHorizontal: 14, 
    color: '#111827', 
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  eyeBtn: { paddingHorizontal: 12 },
  submitBtn: {
    marginTop: 10,
    backgroundColor: '#1BB161',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ChangePasswordScreen;


