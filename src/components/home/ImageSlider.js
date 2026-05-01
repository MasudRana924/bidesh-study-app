import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDE_WIDTH = width - 20; // match AdvisorCard (10px margin on sides)

const IMAGES = [
  // Study abroad / scholarships themed images
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1470&auto=format&fit=crop', // University campus
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1470&auto=format&fit=crop', // Students studying
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1470&auto=format&fit=crop', // Graduation caps
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (index + 1) % IMAGES.length;
      setIndex(next);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: next * SLIDE_WIDTH, animated: true });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);

  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / SLIDE_WIDTH);
    if (newIndex !== index) setIndex(newIndex);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {IMAGES.map((uri, i) => (
          <Image key={i} source={{ uri }} style={styles.image} resizeMode="cover" />
        ))}
      </ScrollView>
      <View style={styles.dotsRow}>
        {IMAGES.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: SLIDE_WIDTH,
    height: Math.round(SLIDE_WIDTH * 0.45),
    marginTop: 10,
    marginHorizontal: 10,
  },
  image: {
    width: SLIDE_WIDTH,
    height: '100%',
  },
  dotsRow: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
  },
  dotActive: {
    backgroundColor: '#1BB161',
    width: 10,
  },
});

export default ImageSlider;


