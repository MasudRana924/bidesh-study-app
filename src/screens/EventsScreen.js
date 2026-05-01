import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EVENTS = [
  {
    id: '1',
    title: 'Dhaka University Admission Fair',
    time: '15th Dec, 2024 | 9:00 AM',
    location: 'Dhaka University Campus',
    description: 'Direct admission guidance for undergraduate programs',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1470&auto=format&fit=crop',
    type: 'University Fair',
  },
  {
    id: '2',
    title: 'BUET Engineering Admission',
    time: '20th Dec, 2024 | 2:00 PM',
    location: 'BUET Campus, Dhaka',
    description: 'Information session for engineering programs',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
    type: 'Admission Info',
  },
  {
    id: '3',
    title: 'Medical College Admission',
    time: '25th Dec, 2024 | 10:00 AM',
    location: 'Dhaka Medical College',
    description: 'Guidance for medical and dental programs',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1470&auto=format&fit=crop',
    type: 'Medical Admission',
  },
  {
    id: '4',
    title: 'Scholarship Information Session',
    time: '30th Dec, 2024 | 3:00 PM',
    location: 'Online Webinar',
    description: 'Available scholarships and financial aid options',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop',
    type: 'Scholarship',
  },
  {
    id: '5',
    title: 'Private University Expo',
    time: '5th Jan, 2025 | 11:00 AM',
    location: 'Bangabandhu International Conference Center',
    description: 'Explore private university options in Bangladesh',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
    type: 'University Expo',
  },
];

const EventsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Events</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {EVENTS.map((ev) => (
          <TouchableOpacity key={ev.id} style={styles.card} activeOpacity={0.8}>
            <Image source={{ uri: ev.image }} style={styles.image} resizeMode="cover" />
            
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <Text style={styles.type}>{ev.type}</Text>
                <Text style={styles.time}>{ev.time}</Text>
              </View>
              
              <Text style={styles.title}>{ev.title}</Text>
              <Text style={styles.description}>{ev.description}</Text>
              
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.location}>{ev.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',

  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#333',
  },
  list: { 
    padding: 16, 
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  image: { 
    width: '100%', 
    height: 180,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  type: {
    fontSize: 12,
    color: '#1BB161',
    fontWeight: '600',
    backgroundColor: '#f0f9f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  time: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default EventsScreen;


