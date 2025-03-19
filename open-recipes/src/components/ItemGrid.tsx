import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { FlippItem } from '../types/FlippItem';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 32) / COLUMN_COUNT; // 32 is total horizontal padding

interface ItemGridProps {
  items: FlippItem[];
  isLoading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ItemGrid: FC<ItemGridProps> = ({ items, isLoading, refreshing, onRefresh }) => {
  if (!Array.isArray(items)) {
    console.error("Items prop is not an array:", items);
    return null;
  }

  const renderItem = ({ item }: { item: FlippItem }) => (
    <View style={styles.itemContainer}>
      {/* Product Image */}
      <Image
        source={{ uri: item.clipping_image_url }}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Product Name */}
      <Text numberOfLines={2} style={styles.productName}>
        {item.name}
      </Text>

      {/* Price Section */}
      <View style={styles.priceContainer}>
        {item.current_price ? (
          <Text style={styles.price}>${item.current_price.toFixed(2)}</Text>
        ) : (
          <Text style={styles.saleStory}>{item.sale_story || 'Check store for price'}</Text>
        )}
      </View>

      {/* Merchant Logo */}
      <View style={styles.merchantContainer}>
        <Image
          source={{ uri: item.merchant_logo }}
          style={styles.merchantLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={COLUMN_COUNT}
      contentContainerStyle={styles.listContainer}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 250, // Fixed height for consistency
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  productName: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '500',
    height: 36, // Height for 2 lines of text
  },
  priceContainer: {
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  saleStory: {
    fontSize: 12,
    color: '#FF4500',
    fontWeight: '500',
  },
  merchantContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  merchantLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default ItemGrid; 