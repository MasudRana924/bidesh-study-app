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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../shared';
import { ROUTES } from '../config/routes';
import { CustomToast, FloatingLabelInput, ErrorModal } from '../shared';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useLanguage } from '../shared';
import * as yup from 'yup';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { registerMutation } = useAuthMutations();
  const insets = useSafeAreaInsets();
  const { register } = useAuth();
  const loading = registerMutation.isPending;
  const { t } = useLanguage();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
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

  const handleSignup = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    console.log('Validation passed, calling API');
    try {
      const result = await registerMutation.mutateAsync({ email: formData.email, password: formData.password });
      console.log('API result:', result);
      
      if (result.success) {
        // Navigate to OTP verification with email
        navigation.navigate(ROUTES.AUTH.OTP_VERIFICATION, { email: formData.email });
      } else {
        // Show backend error as modal
        showError(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.log('API error:', error);
      showError('Network error. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Custom Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#03BC00" />
        </View>
      )}
      

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 40 + insets.bottom }]}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="always"
          showsVerticalScrollIndicator={false}>

          {/* Header with Back Button */}
          <View style={[styles.header ]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={24} color="#111" />
            </TouchableOpacity>
            <View style={styles.headerSpacer} />
          </View>

          {/* Welcome Title */}
          <Text style={styles.welcomeTitle}>Let’s get started!</Text>

          {/* Title */}
          <Text style={styles.title}>Let’s set up your account to get higher education</Text>
          <Text style={styles.title}>Enter your details below.</Text>

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

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpBtn, loading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpText}>{t('signUp')}</Text>
          </TouchableOpacity>

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

export default SignUpScreen;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    // paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F6F6F6',
    marginBottom: 24,
  },
  headerSpacer: { width: 32 },
  topLogo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1f2937',
  },
  dotWrapper: {
    position: 'relative',
    marginLeft: 4,
    marginTop: -4,
  },
  dot: {
    position: 'absolute',
    width: 12,
    height: 8,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#797979',
    textAlign: 'left',
    // marginBottom: 16,
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
    color: '#000080',
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
  debugLoading: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,255,0,0.3)',
    padding: 10,
    borderRadius: 8,
    zIndex: 9999,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(197, 192, 192, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2B2A29',
    fontWeight: '500',
  },
  debugText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
