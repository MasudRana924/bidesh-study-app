import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../shared';

const ApplicationStatusCards = () => {
  const { t } = useLanguage();

  const statusCards = [
    {
      title: 'Submitted',
      count: 12,
      backgroundColor: '#E3F2FD',
      borderColor: '#2196F3',
      textColor: '#1976D2'
    },
    {
      title: 'Accepted',
      count: 8,
      backgroundColor: '#E8F5E8',
      borderColor: '#4CAF50',
      textColor: '#388E3C'
    },
    {
      title: 'Pending',
      count: 5,
      backgroundColor: '#FFF3E0',
      borderColor: '#FF9800',
      textColor: '#F57C00'
    },
    {
      title: 'Rejected',
      count: 3,
      backgroundColor: '#FFEBEE',
      borderColor: '#F44336',
      textColor: '#D32F2F'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Application Status</Text>
      <View style={styles.cardsRow}>
        {statusCards.map((card, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.statusCard, 
              { backgroundColor: card.backgroundColor, borderColor: card.borderColor }
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.cardCount, { color: card.textColor }]}>
              {card.count}
            </Text>
            <Text style={[styles.cardTitle, { color: card.textColor }]}>
              {card.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minHeight: 80,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ApplicationStatusCards;
