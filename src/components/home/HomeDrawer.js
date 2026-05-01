import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LanguageSwitch } from '../../shared';
import { useLanguage } from '../../shared';

const { width } = Dimensions.get('window');

const HomeDrawer = ({
  insets,
  isOpen,
  slideX,
  profileName,
  profilePct,
  onClose,
  onNavigateDocuments,
  onNavigateMySession,
  onNavigateApplication,
  onNavigateChangePassword,
  onNavigateSupport,
  onLogout,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.drawer, { paddingTop: insets.top + 12, transform: [{ translateX: slideX }] }]}>
        {/* Language Switch */}
        <View style={styles.languageSwitchContainer}>
          <LanguageSwitch />
        </View>
        
        {/* Avatar + name + progress */}
        <View style={styles.drawerHeader}>
          <Image source={{ uri: 'https://i.pravatar.cc/100?img=12' }} style={styles.drawerAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.drawerName}>{profileName}</Text>
            <Text style={styles.drawerProgressText}>{`${profilePct}% ${t('profileComplete')}`}</Text>
            <View style={styles.drawerProgressTrack}>
              <View style={[styles.drawerProgressFill, { width: `${profilePct}%` }]} />
            </View>
          </View>
          {/* <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close-outline" size={26} color="#2B2A29" />
          </TouchableOpacity> */}
        </View>

        {/* Menu Items */}
        <View style={styles.drawerMenu}>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onNavigateDocuments}>
            <Ionicons name="document-text-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('documents')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onNavigateMySession}>
            <Ionicons name="time-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('mySession')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onNavigateApplication}>
            <Ionicons name="reader-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('application')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onNavigateChangePassword}>
            <Ionicons name="lock-closed-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('changePassword')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onNavigateSupport}>
            <Ionicons name="help-circle-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>{t('helpSupport')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.menuRow]} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={20} color="#727271" style={styles.menuIcon} />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  languageSwitchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
  closeIcon: { fontSize: 26, color: '#2B2A29' },
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
  menuItem: { paddingVertical: 12 },
  menuRow: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 10 },
  menuItemText: { fontSize: 15, color: '#323232', fontWeight: '400' },
});

export default HomeDrawer;


