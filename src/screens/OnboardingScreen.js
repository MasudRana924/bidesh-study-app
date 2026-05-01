import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../shared';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch {}
    navigation.replace('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 40 + insets.bottom, paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerArea}>
          {/* Top Logo Image (from SignIn) */}
          <Image
            source={{ uri: 'https://i.ibb.co.com/KzhXCxTr/Chat-GPT-Image-Sep-9-2025-05-36-43-PM.png' }}
            style={styles.topLogo}
            resizeMode="cover"
          />

          {/* Logo Row (from SignIn) */}
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>Admission</Text>
            <View style={styles.dotWrapper}>
              <View style={[styles.dot, { backgroundColor: '#1BB161', top: 0, left: 0, transform: [{ rotate: '20deg' }] }]} />
              <View style={[styles.dot, { width: 10, height: 6, backgroundColor: '#fb923c', top: -2, left: 8, transform: [{ rotate: '45deg' }] }]} />
              <View style={[styles.dot, { width: 8, height: 6, backgroundColor: '#dc2626', top: -4, left: 14, transform: [{ rotate: '70deg' }] }]} />
            </View>
            <Text style={[styles.logoText, { marginLeft: 12 }]}>
              <Text style={{ color: '#2B2A29' }}>.</Text>
              ac
            </Text>
          </View>

          {/* Headline & Subtitle */}
          <Text style={styles.title}>{t('getStarted')}</Text>
          <Text style={styles.subtitle}>
            {t('signInTitle')}
          </Text>

          {/* Illustration */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop' }}
            style={styles.illustration}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Get Started Button (sticky bottom) */}
      <View style={[styles.bottomBar, { paddingBottom: 12 + insets.bottom }]}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleGetStarted} activeOpacity={0.8}>
          <Text style={styles.primaryText}>{t('getStarted')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerArea: { width: '100%', maxWidth: 520, alignItems: 'center' },
  topLogo: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    marginTop: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  illustration: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    marginTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  primaryBtn: {
    height: 56,
    borderRadius: 24,
    backgroundColor: '#1BB161',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});


