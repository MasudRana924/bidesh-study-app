import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { FloatingLabelInput } from '../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../shared';
import { ROUTES } from '../config/routes';

const ForgotPasswordResetScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const { email } = route.params || {};
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const onUpdate = () => {
    if (!p1 || !p2 || p1 !== p2) {
      Alert.alert(t('fpResetTitle'), t('fpPasswordsMismatch'));
      return;
    }
    // TODO: call API to update password
    Alert.alert(t('fpResetTitle'), t('passwordUpdated'));
    navigation.navigate(ROUTES.AUTH.SIGN_IN);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        {/* Top logo image (same as SignIn) */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.topLogo}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.pageTitle}>{t('fpResetTitle')}</Text>
        <FloatingLabelInput
          label={t('fpNewPassword')}
          value={p1}
          onChangeText={setP1}
          secureTextEntry
        />
        <FloatingLabelInput
          label={t('fpConfirmNewPassword')}
          value={p2}
          onChangeText={setP2}
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitBtn} onPress={onUpdate}>
          <Text style={styles.submitText}>{t('fpUpdatePassword')}</Text>
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
  headerBtn: { 
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSpacer: { width: 32 },
  body: { padding: 16 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', textAlign: 'left', marginBottom: 12 },
  logoContainer: { alignItems: 'center', marginBottom: 12 },
  topLogo: {
    width: 60,
    height: 60,
  },
  label: { fontSize: 13, color: '#374151', fontWeight: '600', marginBottom: 6 },
  input: {
    width: '100%', height: 50, backgroundColor: '#F9FAFB', borderRadius: 10,
    paddingHorizontal: 14, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', fontSize: 15,
  },
  // Floating styles live in component
  submitBtn: { marginTop: 16, backgroundColor: '#1BB161', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ForgotPasswordResetScreen;


