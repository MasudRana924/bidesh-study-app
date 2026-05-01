import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import HomeHeader from '../components/home/HomeHeader';
import HomeDrawer from '../components/home/HomeDrawer';
import EventsSection from '../components/home/EventsSection';
import AdvisorCard from '../components/home/AdvisorCard';
import WhyChooseUs from '../components/home/WhyChooseUs';
import InstitutionsSection from '../components/home/InstitutionsSection';
import ImageSlider from '../components/home/ImageSlider';
import { useMe } from '../hooks/useMe';
import { useAuth } from '../shared';
import { ROUTES } from '../config/routes';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  // Set status bar for home screen
  useFocusEffect(
    React.useCallback(() => {
      // Header & app now use light theme on Home → use dark status bar content on white bg
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      
      return () => {
        // Reset to default when leaving home screen
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#fff');
      };
    }, [])
  );

  // Fetch logged-in user profile (includes profileCompletion.percentage)
  const { data: me, isLoading: isMeLoading } = useMe();

  const profileName = me?.name || me?.user?.name || 'User';
  const profilePct = typeof me?.profileCompletion?.percentage === 'number'
    ? me.profileCompletion.percentage
    : 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideX = useState(new Animated.Value(-width))[0];

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideX, { toValue: 0, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    // Hide bottom tab bar while drawer is open
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  };

  const closeMenu = () => {
    Animated.timing(slideX, { toValue: -width, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(({ finished }) => {
      if (finished) setIsMenuOpen(false);
    });
    // Restore bottom tab bar styling when drawer closes
    navigation.getParent()?.setOptions({ tabBarStyle: { paddingBottom: Math.max(insets.bottom, 8), height: 60 + insets.bottom } });
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  // Layout constants
  const HEADER_BASE_HEIGHT = 160; // base header body height (excludes notch)

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <HomeHeader
          insets={insets}
          navigation={navigation}
          profileName={isMeLoading ? '...' : profileName}
          profilePct={isMeLoading ? 0 : profilePct}
          onMenuPress={openMenu}
          headerHeight={HEADER_BASE_HEIGHT}
        />

        {/* Advisor Card (simple, no overlap) */}
        <View style={styles.advisorContainer}>
          <AdvisorCard navigation={navigation} />
        </View>

        {/* Image Slider */}
        <ImageSlider />

        {/* Body */}
        <View style={styles.body}>
          {/* Why choose us */}
          <WhyChooseUs />

          {/* Institutions Section */}
          <InstitutionsSection navigation={navigation} />

        {/* Events Section */}
        <EventsSection navigation={navigation} />
        </View>
      </ScrollView>

      {/* 🔹 Slide-in Left Menu (Component) */}
      <HomeDrawer
        insets={insets}
        isOpen={isMenuOpen}
        slideX={slideX}
        profileName={isMeLoading ? '...' : profileName}
        profilePct={isMeLoading ? 0 : profilePct}
        onClose={closeMenu}
        onNavigateDocuments={() => { closeMenu(); navigation.navigate(ROUTES.MAIN.PROFILE); }}
        onNavigateMySession={() => { closeMenu(); navigation.navigate(ROUTES.MAIN.ADVISER_CHAT); }}
        onNavigateApplication={() => { closeMenu(); navigation.navigate(ROUTES.MAIN.APPLICATION_FORM); }}
        onNavigateChangePassword={() => { closeMenu(); navigation.navigate(ROUTES.MAIN.CHANGE_PASSWORD); }}
        onNavigateSupport={() => { closeMenu(); navigation.navigate(ROUTES.MAIN.SUPPORT); }}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, padding: 16 },
  advisorContainer: {
    paddingHorizontal: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    flexDirection: 'row',
    zIndex: 9999,
    elevation: 9999,
  },
  overlayTouchable: { flex: 1 },
  drawer: {
    width: Math.min(360, width * 0.75),
    backgroundColor: '#fff',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 6,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: { fontSize: 26, color: '#111' },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  drawerAvatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  drawerName: { fontSize: 16, fontWeight: '700', color: '#323232' },
  drawerProgressText: { fontSize: 12, color: '#6B7280', marginTop: 6, marginBottom: 6 },
  drawerProgressTrack: { width: '100%', height: 6, backgroundColor: '#E5E7EB', borderRadius: 999, overflow: 'hidden' },
  drawerProgressFill: { height: '100%', backgroundColor: '#1BB161', borderRadius: 999 },
  drawerMenu: { paddingHorizontal: 16, paddingVertical: 16 },
  drawerSectionTitle: { fontSize: 14, fontWeight: '700', color: '#323232', marginBottom: 12 },
  menuItem: { paddingVertical: 12 },
  menuItemText: { fontSize: 15, color: '#323232', fontWeight: '400' },
});

export default HomeScreen;
