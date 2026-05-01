import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { FloatingLabelInput } from '../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from '../shared';
import { ROUTES } from '../config/routes';

const ForgotPasswordEmailScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');


  const onSend = () => {
    if (!email) {
      Alert.alert(t('fpEnterEmailTitle'), t('fpEmailPlaceholder'));
      return;
    }
    // TODO: call API to send OTP
    Alert.alert(t('fpEnterEmailTitle'), t('fpCodeSent'));
    navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD_OTP, { email });
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
        <Text style={styles.pageTitle}>{t('forgotPassword')}</Text>
        <Text style={styles.pageSubtitle}>{t('fpEmailSubtitle')}</Text>
        {/* <Text style={styles.label}>{t('fpEmailLabel')}</Text> */}
        <FloatingLabelInput
          label={t('fpEmailLabel')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.submitBtn} onPress={onSend}>
          <Text style={styles.submitText}>{t('fpSendCode')}</Text>
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
  pageTitle: { fontSize: 18, fontWeight: '500', color: '#2B2A29', textAlign: 'left', marginBottom: 12 },
  pageSubtitle: { fontSize: 13, color: '#727271', marginTop: -4, marginBottom: 10 },
  // Floating label styles are now inside component
  logoContainer: { alignItems: 'center', marginBottom: 16 },
  topLogo: {
    width: 60,
    height: 60,
  },
  label: { fontSize: 13, color: '#374151', fontWeight: '600', marginBottom: 6 },
  input: {
    width: '100%', height: 50, backgroundColor: '#F9FAFB', borderRadius: 10,
    paddingHorizontal: 14, borderWidth: 1, borderColor: '#E5E7EB', color: '#111827', fontSize: 15,
  },
  submitBtn: { marginTop: 16, backgroundColor: '#1BB161', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ForgotPasswordEmailScreen;


