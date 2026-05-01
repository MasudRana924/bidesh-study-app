import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../shared';
import { CustomToast, FloatingLabelInput, ErrorModal, LanguageSwitch } from '../shared';
import { ROUTES } from '../config/routes';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useLanguage } from '../shared';
import * as yup from 'yup';

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { loginMutation } = useAuthMutations();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const loading = loginMutation.isPending;
  const { t } = useLanguage();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleInputChange = async (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    
    // Validate field on change
    try {
      await validationSchema.validateAt(field, { ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.message }));
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleSignin = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      const result = await loginMutation.mutateAsync({ email: formData.email, password: formData.password });
      
      if (result.success) {
        navigation.replace('Main');
      } else {
        // Show backend error as modal
        showError(result.error || 'Something went wrong');
      }
    } catch (error) {
      showError('Network error. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header with Language Switch */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <LanguageSwitch 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </View>
      {/* Spinner Overlay */}
      <Spinner
        visible={loading}
        textStyle={{ color: '#03BC00' }}
        overlayColor="rgba(255,255,255,0.7)"
        customIndicator={<ActivityIndicator size="large" color="#03BC00" />}
      />
      {/* {loading && (
        <View style={styles.fullscreenOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#2B2A29" />
        </View>
      )} */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 40 + insets.bottom, paddingTop: insets.top }]}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}>
          
          {/* Top Logo Image */}
          <Image
            source={require('../assets/logo.png')}
            style={styles.topLogo}
            resizeMode="cover"
          />

          {/* Logo Row */}
          

          {/* Welcome Title */}
          <Text style={styles.welcomeTitle}>Welcome Study Abroad</Text>

          {/* Title */}
          <Text style={styles.title}>Log in to access your account</Text>

          {/* Email */}
          <FloatingLabelInput
            label={t('email')}
            value={formData.email}
            onChangeText={(v) => handleInputChange('email', v)}
            keyboardType="email-address"
            error={errors.email}
            placeholder="Email"
            icon="mail"
          />

          {/* Password */}
          <FloatingLabelInput
            label={t('password')}
            value={formData.password}
            onChangeText={(v) => handleInputChange('password', v)}
            secureTextEntry={true}
            error={errors.password}
            placeholder="Password"
            icon="lock"
          />

          {/* Remember Me and Forgot Password Row */}
          <View style={styles.authRow}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
                  <View style={styles.checkboxChecked}>
                    <Icon name="check" size={12} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD_EMAIL)}>
              <Text style={styles.forgotText}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signUpBtn, loading && { opacity: 0.7 }]}
            onPress={handleSignin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>{t('signIn')}</Text>
          </TouchableOpacity>

          {/* Not a member */}
          <View style={styles.signInRow}>
            <Text style={styles.signInHint}>{t('dontHaveAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.AUTH.SIGN_UP)}>
              <Text style={styles.signInLink}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Error Modal */}
      <ErrorModal
        visible={showErrorModal}
        error={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  topLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerSpacer: { 
    flex: 1 
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#797979',
    textAlign: 'left',
    lineHeight: 28,
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F1F1F',
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 40,
    width: '100%',
  },
  authRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 16,
    height: 16,
    backgroundColor: '#1BB161',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  forgotText: { 
    color: '#323232', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 48,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  signUpBtn: {
    width: '100%',
    height: 56,
    borderRadius: 24,
    backgroundColor: '#1BB161',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  signInHint: {
    color: '#6b7280',
    fontSize: 14,
  },
  signInLink: {
    color: '#323232',
    fontSize: 14,
    fontWeight: '600',
  },
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  generalError: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});
