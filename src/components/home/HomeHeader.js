import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useLanguage } from '../../shared';
import { ROUTES } from '../../config/routes';

const { width } = Dimensions.get('window');

const HomeHeader = ({ insets, navigation, profileName, onMenuPress, headerHeight = 160 }) => {
  const { t } = useLanguage();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top, height: headerHeight + insets.top }]}> 
      <View style={styles.header}>
        {/* Pattern overlay */}
        <View style={styles.patternOverlay} />
        
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.roundIconBtn} onPress={onMenuPress}>
              <Icon name="menu" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Hi, {profileName}</Text>
              <Text style={styles.subGreeting}>Welcome back!</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={() => navigation.navigate(ROUTES.MAIN.NOTIFICATIONS)}>
              <Icon name="bell" size={18} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roundIconBtn, { marginLeft: 10 }]}
              onPress={() => navigation.navigate(ROUTES.MAIN.ADVISER_CHAT)}>
              <Icon name="message-circle" size={18} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#1BB161',
    paddingHorizontal: 20,
    paddingBottom: 4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    right: -50,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 100,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  greetingContainer: {
    justifyContent: 'center',
  },
  roundIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#1BB161',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  greeting: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#fff',
    textShadow: { shadowColor: 'rgba(0,0,0,0.2)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.4, shadowRadius: 3 },
  },
  subGreeting: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 2,
  },
  profileProgress: {
    fontSize: 12,
    color: '#E4E7E9',
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default HomeHeader;


