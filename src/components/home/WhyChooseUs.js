import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WhyChooseUs = () => {
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={styles.sectionLabel}>Why choose us</Text>
      <View style={styles.grid}>
        <View style={styles.impactCard}>
          <MaterialIcons name="verified" size={24} color="#2B2A29" />
          <Text style={styles.impactTitle}>1,500+ programs</Text>
          <Text style={styles.impactSub}>Top global programs</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="support-agent" size={24} color="#2B2A29" />
          <Text style={styles.impactTitle}>Local advisors</Text>
          <Text style={styles.impactSub}>Visa & application help</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="school" size={24} color="#2B2A29" />
          <Text style={styles.impactTitle}>Scholarships</Text>
          <Text style={styles.impactSub}>Find funding options</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="bolt" size={24} color="#2B2A29" />
          <Text style={styles.impactTitle}>Fast matching</Text>
          <Text style={styles.impactSub}>Personalized results</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '700',
    marginBottom: 10,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  impactCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  impactTitle: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 13,
    color: '#1E293B',
  },
  impactSub: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default WhyChooseUs;


