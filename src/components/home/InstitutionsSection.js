import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { useLanguage } from '../../shared';
import { ROUTES } from '../../config/routes';

const { width } = Dimensions.get('window');

const InstitutionsSection = ({ navigation }) => {
  const institutions = [
    {
      id: '1',
      name: 'Harvard University',
      type: 'Ivy League University',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
      rating: '4.9',
      programs: 'Undergraduate & Graduate',
    },
    {
      id: '2',
      name: 'Oxford University',
      type: 'UK University',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
      rating: '4.8',
      programs: 'Liberal Arts & Sciences',
    },
    {
      id: '3',
      name: 'MIT',
      type: 'Engineering University',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop',
      rating: '4.9',
      programs: 'Technology & Engineering',
    },
    {
      id: '4',
      name: 'Stanford University',
      type: 'Private Research University',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
      rating: '4.8',
      programs: 'Business & Technology',
    },
    {
      id: '5',
      name: 'Cambridge University',
      type: 'UK University',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
      rating: '4.7',
      programs: 'Research & Academia',
    },
    {
      id: '6',
      name: 'ETH Zurich',
      type: 'Swiss University',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470&auto=format&fit=crop',
      rating: '4.6',
      programs: 'Engineering & Technology',
    },
  ];

  const { t } = useLanguage();

  const renderInstitution = ({ item }) => (
    <TouchableOpacity style={styles.institutionCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.institutionImage}
        resizeMode="cover"
      />
      <View style={styles.institutionContent}>
        <View style={styles.institutionHeader}>
          <Text style={styles.institutionName}>{item.name}</Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
        <Text style={styles.institutionType}>{item.type}</Text>
        <Text style={styles.programs}>{item.programs}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('institutions')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MAIN.INSTITUTION_DETAILS)}>
          <Text style={styles.seeAll}>{t('seeAll')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={institutions}
        renderItem={renderInstitution}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  seeAll: { fontSize: 14, fontWeight: '600', color: '#1BB161' },
  flatListContainer: {
    paddingLeft: 0,
    paddingRight: 16,
  },
  separator: {
    width: 16,
  },
  institutionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    width: width * 0.8,
    // marginLeft: 16,
  },
  institutionImage: { 
    width: '100%', 
    height: 160,
  },
  institutionContent: {
    padding: 16,
  },
  institutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  institutionName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#333',
    flex: 1,
  },
  rating: {
    fontSize: 14,
    color: '#1BB161',
    fontWeight: '600',
  },
  institutionType: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  programs: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
});

export default InstitutionsSection;


