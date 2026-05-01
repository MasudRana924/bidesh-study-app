import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For back arrow
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from '../shared';
import { CustomToast } from '../shared';
import { useAuthMutations } from '../hooks/useAuthMutations';
import { useLanguage } from '../shared';

const OTPVerificationScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResendActive, setIsResendActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const inputRefs = useRef([]);
  const { verifyOtpMutation } = useAuthMutations();
  const { t } = useLanguage();
  const { verifyOTP } = useAuth();
  
  // Get email from route params
  const email = route?.params?.email || '***@gmail.com';

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const showToast = (message, type = 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      showToast('Please enter a valid 4-digit OTP', 'error');
      return;
    }

    try {
      setLoading(true);
      const result = await verifyOtpMutation.mutateAsync({ email, otp: otpCode });
      
      if (result.success) {
        showToast('OTP verified successfully!', 'success');
        setTimeout(() => {
          navigation.replace('Main');
        }, 1000);
      } else {
        // Show error message from backend
        const errorMessage = result.error || 'Invalid OTP. Please try again.';
        showToast(errorMessage, 'error');
        // Clear OTP fields on failure
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Spinner Overlay */}
      <Spinner
        visible={loading}
        textStyle={{ color: '#2B2A29' }}
        overlayColor="rgba(255,255,255,0.7)"
        customIndicator={<ActivityIndicator size="large" color="#2B2A29" />}
      />
      {/* Fallback Fullscreen Overlay to ensure visibility on all devices */}
      {loading && (
        <View style={styles.fullscreenOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#2B2A29" />
        </View>
      )}
      
      {/* Custom Toast */}
      <CustomToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={2000}
        onHide={hideToast}
      />
      
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 20 + insets.bottom }] }>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top }]}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            disabled={loading}
            onPress={() => !loading && navigation.goBack()}
          >
            <Icon name="chevron-back-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={{ width: 40 }} />
        </View>

        {/* Top logo image (same as SignIn) */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.topLogo}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.description}>
            Please enter the verification code shared to {'\n'}
            <Text style={{ fontWeight: '500', color: '#374151' }}> {email}</Text>
          </Text>

          {/* OTP Input Fields */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.otpInput}
                value={digit}
                keyboardType="numeric"
                maxLength={1}
                editable={!loading}
                onChangeText={(val) => !loading && handleInputChange(index, val)}
                onKeyPress={(e) => !loading && handleKeyPress(index, e)}
              />
            ))}
          </View>

          {/* Resend OTP */}
          <Text style={styles.resendText}>
            Still not received OTP?{' '}
            <Text
              style={[styles.resendLink, (isResendActive || loading) && { color: '#c4c4c4' }]}
              onPress={() => !loading && setIsResendActive(true)}
            >
              Resend
            </Text>
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              otp.every((digit) => digit !== '') && { backgroundColor: '#1BB161' },
              loading && { opacity: 0.7 },
            ]}
            disabled={!otp.every((digit) => digit !== '') || loading}
            onPress={handleVerifyOTP}
          >
            <Text style={styles.submitText}>{t('submit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between backBtn and logoRow
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  topLogo: {
    width: 140,
    height: 140,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E232C',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    borderWidth:1,
    borderColor:'#C0C0C0'
  },
  resendText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  resendLink: {
    color: '#ef4444',
    fontWeight: '500',
  },
  submitBtn: {
    height: 56,
    borderRadius: 24,
    backgroundColor: '#1BB161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
});
