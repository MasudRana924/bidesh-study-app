import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EventCard from './EventCard';
import { useLanguage } from '../../shared';
import { ROUTES } from '../../config/routes';

const EventsSection = ({ navigation }) => {
  const events = [
    {
      id: '1',
      title: 'Dhaka University Admission Fair',
      time: '15th Dec, 2024 | 9:00 AM',
      location: 'DU Campus',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1470&auto=format&fit=crop',
      type: 'University Fair',
    },
    {
      id: '2',
      title: 'BUET Engineering Info Session',
      time: '20th Dec, 2024 | 2:00 PM',
      location: 'BUET Campus',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
      type: 'Admission Info',
    },
    {
      id: '3',
      title: 'Medical College Guidance',
      time: '25th Dec, 2024 | 10:00 AM',
      location: 'DMC Campus',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1470&auto=format&fit=crop',
      type: 'Medical Admission',
    },
  ];

  const { t } = useLanguage();
  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('events')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MAIN.EVENTS)}>
          <Text style={styles.seeAll}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>

      {events.map((ev) => (
        <EventCard key={ev.id} {...ev} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: { marginTop: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#4361EE' },
});

export default EventsSection;


