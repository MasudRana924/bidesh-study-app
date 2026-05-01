import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useLanguage } from '../../shared';
import { ROUTES } from '../../config/routes';

const { width } = Dimensions.get('window');

const HomeHeader = ({ insets, navigation, profileName, onMenuPress, headerHeight = 160 }) => {
  const { t } = useLanguage();
  return (
    <View style={[styles.header, { paddingTop: insets.top, height: headerHeight + insets.top }]}> 
      <View style={styles.row}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.roundIconBtn} onPress={onMenuPress}>
            <Icon name="menu" size={20} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Hi, {profileName}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.roundIconBtn}
            onPress={() => navigation.navigate(ROUTES.MAIN.NOTIFICATIONS)}>
            <Icon name="bell" size={18} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roundIconBtn, { marginLeft: 10 }]}
            onPress={() => navigation.navigate(ROUTES.MAIN.ADVISER_CHAT)}>
            <Icon name="message-circle" size={18} color="#000" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ff',
    paddingHorizontal: 20,
    paddingBottom: 4,
    height: 80,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  roundIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  greeting: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#000',
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
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#EF4444',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 4,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default HomeHeader;


