import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 24) / 2;

export const SkeletonLoader: React.FC = () => {
  return (
    <View style={styles.skeleton}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
      <View style={[styles.skeletonText, { width: '70%' }]} />
    </View>
  );
};

export const SkeletonGrid: React.FC = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={() => <SkeletonLoader />}
      keyExtractor={(item) => item.toString()}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    marginHorizontal: 6,
    elevation: 3,
  },
  skeletonImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
  },
  skeletonText: {
    height: 12,
    backgroundColor: '#e0e0e0',
    margin: 10,
    borderRadius: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
