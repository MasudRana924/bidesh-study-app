import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../shared';
import { ROUTES } from '../../config/routes';

const AdvisorCard = ({ navigation }) => {
  const { t } = useLanguage();
  return (
    <View style={styles.advisorCard}>
      <View style={styles.advisorInfo}>
        <View style={styles.advisorAvatar}>
          <Text style={styles.advisorAvatarText}>SM</Text>
        </View>
        <View style={styles.advisorDetails}>
          <Text style={styles.advisorName} numberOfLines={1} ellipsizeMode="tail">{t('consultAdvisor')}</Text>
          {/* <Text style={styles.advisorSub} numberOfLines={1} ellipsizeMode="tail">Shipra Mehra</Text> */}
        </View>
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate(ROUTES.MAIN.ADVISER_CHAT)}>
        <Text style={styles.chatButtonText}>{t('chatNow')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  advisorCard: {
    backgroundColor: '#E4E7E9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    width: '100%',
    height: 100,
    borderRadius: 14,
    position: 'relative',
    zIndex: 5,
    // borderWidth: 1,
    // borderColor: '#E5E7EB',
  },
  advisorInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  advisorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  advisorAvatarText: { color: '#2B2A29', fontWeight: '600', fontSize: 18 },
  advisorDetails: { flex: 1 },
  advisorName: { color: '#2B2A29', fontWeight: '600', fontSize: 16, flexShrink: 1 },
  advisorSub: { color: '#2B2A29', opacity: 0.9, fontSize: 14, flexShrink: 1 },
  chatButton: {
    backgroundColor: '#1BB161',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: 'center',
  },
  chatButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});

export default AdvisorCard;


