import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SupportScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <Ionicons name="help-buoy-outline" size={48} color="#2B2A29" />
          <Text style={styles.heroTitle}>How this app helps</Text>
          <Text style={styles.heroSub}>We are an education agency helping students apply for higher studies abroad.</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="school-outline" size={24} color="#111827" style={styles.cardIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Discover institutions & programs</Text>
            <Text style={styles.cardText}>Browse universities worldwide and find programs that match your goals.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="chatbubbles-outline" size={24} color="#111827" style={styles.cardIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Talk to an advisor</Text>
            <Text style={styles.cardText}>Get guidance on eligibility, documents, and timelines via in‑app chat.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="document-text-outline" size={24} color="#111827" style={styles.cardIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Apply and track progress</Text>
            <Text style={styles.cardText}>Submit documents securely and follow your application status in real time.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
  headerSpacer: { width: 32 },
  body: { padding: 16, paddingBottom: 40 },
  hero: { alignItems: 'center', marginBottom: 16, gap: 8 },
  heroTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  heroSub: { fontSize: 14, color: '#4B5563', textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardIcon: { marginRight: 12, marginTop: 2 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  cardText: { fontSize: 14, color: '#374151' },
});

export default SupportScreen;


