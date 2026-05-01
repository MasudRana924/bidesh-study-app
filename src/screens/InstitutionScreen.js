import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInstitutions } from '../hooks/useInstitutions';
import { ROUTES } from '../config/routes';

const { width } = Dimensions.get('window');

const institutes = [
  {
    id: 1,
    name: 'Algoma University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$12k',
    price: 12000,
    ielts: 6.5,
    country: 'Canada',
    logoType: 'algoma',
  },
  {
    id: 2,
    name: 'Acadia University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$14k',
    price: 14000,
    ielts: 6.0,
    country: 'Canada',
    logoType: 'acadia',
  },
  {
    id: 3,
    name: 'Cal Arts University',
    location: 'Nova Scotia, Canada',
    programs: '2 matching programs',
    acceptance: '74%',
    cost: '$10k',
    price: 10000,
    ielts: 5.5,
    country: 'Canada',
    logoType: 'calArts',
  },
  {
    id: 4,
    name: 'University of Westminster',
    location: 'London, UK',
    programs: '3 matching programs',
    acceptance: '68%',
    cost: '£11k',
    price: 11000,
    ielts: 6.5,
    country: 'UK',
    logoType: 'acadia',
  },
  {
    id: 5,
    name: 'Victoria University',
    location: 'Melbourne, Australia',
    programs: '4 matching programs',
    acceptance: '72%',
    cost: 'A$15k',
    price: 15000,
    ielts: 6.0,
    country: 'Australia',
    logoType: 'algoma',
  },
];

const renderLogo = (type) => {
  switch (type) {
    case 'algoma':
      return <Text style={[styles.logo, styles.algomaLogo]}>Algoma</Text>;
    case 'acadia':
      return <Text style={[styles.logo, styles.acadiaLogo]}>🛡️</Text>;
    case 'calArts':
      return (
        <Text style={[styles.logo, styles.calArtsLogo]}>CAL{'\n'}ARTS</Text>
      );
    default:
      return null;
  }
};

const InstitutionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState({}); // keep track of bookmarked institutes
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('priceAsc'); // priceAsc | priceDesc | null
  const [minIelts, setMinIelts] = useState(null); // e.g., 5.5, 6.0, 6.5, 7.0
  const [country, setCountry] = useState('All');

  // Use React Query to fetch institutions
  const {
    data: institutionsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useInstitutions({ search: searchQuery });

  // Fallback to mock data if API fails or returns empty
  const institutions = institutionsData?.institutions || institutes;

  // Build country options from data
  const countries = ['All', ...Array.from(new Set(institutions.map(i => i.country).filter(Boolean)))];

  // Filter + sort
  const filteredInstitutes = institutions
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => (minIelts ? (item.ielts || 0) >= minIelts : true))
    .filter((item) => (country && country !== 'All' ? item.country === country : true))
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'priceDesc') return (b.price || 0) - (a.price || 0);
      return 0;
    });

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {!searchActive ? (
            <Text style={styles.headerTitle}>Institutes</Text>
          ) : (
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoFocus
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (searchActive) {
              setSearchQuery(''); // reset search
              setSearchActive(false);
            } else {
              setSearchActive(true);
            }
          }}>
          <Ionicons
            name={searchActive ? 'close' : 'search'}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Sort & Filter Bar */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterChip} onPress={() => setShowFilters(!showFilters)}>
          <Ionicons name="options-outline" size={16} color="#323232" />
          <Text style={styles.filterChipText}>Filter</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[styles.sortChip, sortBy === 'priceAsc' && styles.sortChipActive]}
            onPress={() => setSortBy('priceAsc')}
          >
            <Ionicons name="cash-outline" size={16} color={sortBy === 'priceAsc' ? '#fff' : '#323232'} />
            <Text style={[styles.sortChipText, sortBy === 'priceAsc' && styles.sortChipTextActive]}>Tuition Low–High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortChip, sortBy === 'priceDesc' && styles.sortChipActive]}
            onPress={() => setSortBy('priceDesc')}
          >
            <Ionicons name="cash-outline" size={16} color={sortBy === 'priceDesc' ? '#fff' : '#323232'} />
            <Text style={[styles.sortChipText, sortBy === 'priceDesc' && styles.sortChipTextActive]}>Tuition High–Low</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>IELTS</Text>
            <View style={styles.pillRow}>
              {[5.5, 6.0, 6.5, 7.0].map((v) => (
                <TouchableOpacity key={v} style={[styles.pill, minIelts === v && styles.pillActive]} onPress={() => setMinIelts(minIelts === v ? null : v)}>
                  <Text style={[styles.pillText, minIelts === v && styles.pillTextActive]}>{v}+</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Country</Text>
            <View style={styles.pillRow}>
              {countries.map((c) => (
                <TouchableOpacity key={c} style={[styles.pill, country === c && styles.pillActive]} onPress={() => setCountry(c)}>
                  <Text style={[styles.pillText, country === c && styles.pillTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Institutes List */}
      <ScrollView 
        contentContainerStyle={[styles.list, { paddingBottom: 20 + insets.bottom }]}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {/* Loading State */}
        {/* {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2B2A29" />
            <Text style={styles.loadingText}>Loading institutions...</Text>
          </View>
        )} */}

        {/* Error State */}
        {/* {error && !isLoading && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
            <Text style={styles.errorTitle}>Failed to Load Institutions</Text>
            <Text style={styles.errorSubtitle}>
              {error.message || 'Something went wrong. Please try again.'}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )} */}

        {/* Success State */}
        { filteredInstitutes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(ROUTES.MAIN.INSTITUTION_DETAILS, { institute: item })
            }>
            <View style={styles.cardHeader}>
              <View style={styles.info}>
                {renderLogo(item.logoType)}
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.programs}>{item.programs}</Text>
                </View>
              </View>

              {/* Bookmark Button */}
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation(); // stop parent card press
                  toggleBookmark(item.id);
                }}>
                <Ionicons
                  name={bookmarks[item.id] ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={bookmarks[item.id] ? '#DF252A' : '#ccc'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{item.acceptance}</Text>
                <Text style={styles.statLabel}>Acceptance Rate</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{item.cost}</Text>
                <Text style={styles.statLabel}>Tuition Fees</Text>
              </View>
            </View>
            {/* Tags */}
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Ionicons name="ribbon-outline" size={14} color="#323232" style={styles.tagIcon} />
                <Text style={styles.tagText}>IELTS {item.ielts || '-'}</Text>
              </View>
              <View style={styles.tag}>
                <Ionicons name="earth-outline" size={14} color="#323232" style={styles.tagIcon} />
                <Text style={styles.tagText}>{item.country || '—'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {/* No Results */}
        {/* {!isLoading && !error && filteredInstitutes.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.noResultsTitle}>No Institutes Found</Text>
            <Text style={styles.noResultsSubtitle}>
              Try adjusting your search or filters to find what you're looking for.
            </Text>
          </View>
        )} */}

      </ScrollView>
    </View>
  );
};

export default InstitutionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    // marginLeft: 12,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom:10
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  filterChipText: { color: '#323232', fontWeight: '600', fontSize: 12 },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  sortChipActive: { backgroundColor: '#1BB161', borderColor: '#1BB161' },
  sortChipText: { color: '#323232', fontWeight: '600', fontSize: 12 },
  sortChipTextActive: { color: '#fff' },
  filtersPanel: { paddingHorizontal: 16, paddingBottom: 8 },
  filterRow: { marginBottom: 8 },
  filterLabel: { fontSize: 13, color: '#374151', fontWeight: '700', marginBottom: 6 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  pillActive: { backgroundColor: '#111827', borderColor: '#111827' },
  pillText: { color: '#323232', fontWeight: '600', fontSize: 12 },
  pillTextActive: { color: '#fff' },
  tagRow: { 
    flexDirection: 'row', 
    gap: 12, 
    marginTop: 16,
    justifyContent: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagIcon: { marginRight: 6 },
  tagText: { 
    color: '#333', 
    fontWeight: '600', 
    fontSize: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: width * 0.04,
    height: 35,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',

  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  algomaLogo: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    color: '#ff6b6b',
    fontSize: width * 0.03,
    paddingTop: 12,
  },
  acadiaLogo: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    fontSize: width * 0.045,
    paddingTop: 8,
  },
  calArtsLogo: {
    backgroundColor: '#00bcd4',
    color: '#fff',
    fontSize: width * 0.03,
    lineHeight: width * 0.035,
    paddingTop: 8,
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  programs: {
    fontSize: 14,
    color: '#1BB161',
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
    marginTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  loadingText: {
    fontSize: width * 0.04,
    color: '#666',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
  },
  errorSubtitle: {
    fontSize: width * 0.035,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#1BB161',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  noResultsTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
  },
  noResultsSubtitle: {
    fontSize: width * 0.035,
    color: '#888',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
    lineHeight: 20,
  },

});
