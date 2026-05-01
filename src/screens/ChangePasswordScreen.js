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

  const PasswordField = ({ label, value, onChangeText, secureKey }) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure[secureKey]}
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
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

      <View style={styles.body}>
        <PasswordField label={t('currentPassword')} value={currentPassword} onChangeText={setCurrentPassword} secureKey="c" />
        <PasswordField label={t('newPassword')} value={newPassword} onChangeText={setNewPassword} secureKey="n" />
        <PasswordField label={t('confirmPassword')} value={confirmPassword} onChangeText={setConfirmPassword} secureKey="r" />

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
  headerBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSpacer: { width: 32 },
  body: { padding: 16 },
  fieldWrapper: { marginBottom: 14 },
  label: { fontSize: 13, color: '#374151', fontWeight: '600', marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: { flex: 1, height: 45, paddingHorizontal: 14, color: '#111827', fontSize: 15 },
  eyeBtn: { paddingHorizontal: 12 },
  submitBtn: {
    marginTop: 10,
    backgroundColor: '#1BB161',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ChangePasswordScreen;


