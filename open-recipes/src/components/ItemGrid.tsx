import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { FlippItem } from '../types/OR_Item';

interface ItemGridProps {
  items: FlippItem[];
  isLoading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const screenWidth = Dimensions.get('window').width;
const cardMargin = 8; // margin around each card
const cardsPerRow = 3;
const cardWidth = (screenWidth - cardMargin * (cardsPerRow + 1)) / cardsPerRow;

const ItemGrid: FC<ItemGridProps> = ({ items, isLoading, refreshing, onRefresh }) => {
  if (!Array.isArray(items)) {
    console.error("Items prop is not an array:", items);
    return null;
  }

  const renderItem = ({ item }: { item: FlippItem }) => (
    <View
      style={{
        width: cardWidth,
        margin: cardMargin / 2,
      }}
      className="bg-white rounded-lg p-2 shadow-md"
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.clean_image_url }}
        className="w-full h-[120px] rounded-md"
        resizeMode="contain"
      />

      {/* Product Name */}
      <Text
        numberOfLines={2}
        className="text-xs mt-2 mb-1 font-semibold h-9"
      >
        {item.name}
      </Text>

      {/* Price Section */}
      <View className="mt-1">
        {item.current_price ? (
          <Text className="text-base font-bold text-green-600">
            ${item.current_price.toFixed(2)}
          </Text>
        ) : (
          <Text className="text-xs text-orange-500">
            {item.sale_story || 'Check store for price'}
          </Text>
        )}
      </View>

      {/* Merchant Logo */}
      <View className="absolute bottom-2 right-2">
        <Image
          source={{ uri: item.merchant_logo }}
          className="w-6 h-6 rounded-full"
          resizeMode="contain"
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-base text-gray-600">
          No items found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: cardMargin }}
      contentContainerStyle={{ paddingHorizontal: cardMargin, paddingTop: cardMargin }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default ItemGrid;