import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WhyChooseUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Why choose us</Text>
      <View style={styles.grid}>
        <View style={styles.impactCard}>
          <MaterialIcons name="verified" size={24} color="#1BB161" />
          <Text style={styles.impactTitle}>1,500+ programs</Text>
          <Text style={styles.impactSub}>Top global programs</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="support-agent" size={24} color="#1BB161" />
          <Text style={styles.impactTitle}>Local advisors</Text>
          <Text style={styles.impactSub}>Visa & application help</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="school" size={24} color="#1BB161" />
          <Text style={styles.impactTitle}>Scholarships</Text>
          <Text style={styles.impactSub}>Find funding options</Text>
        </View>
        <View style={styles.impactCard}>
          <MaterialIcons name="bolt" size={24} color="#1BB161" />
          <Text style={styles.impactTitle}>Fast matching</Text>
          <Text style={styles.impactSub}>Personalized results</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12,
  },
  impactCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  impactTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  impactSub: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
  },
});

export default WhyChooseUs;


