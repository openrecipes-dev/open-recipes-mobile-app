import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import SearchBar from '../components/SearchBar';
import ItemGrid from '../components/ItemGrid';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { searchFlippItems } from '../api/flippApi';
import { FlippItem, UserLocation } from '../types/FlippItem';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FlippItem[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    setIsLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Location access is required for better search results. Default location will be used.',
          [{ text: 'OK' }]
        );
        setIsLocationLoading(false);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your location. Default location will be used.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsLoading(true);
      try {
        const response = await searchFlippItems(query, userLocation);
        setSearchResults(response.items);
      } catch (error) {
        console.error('Search error:', error);
        Alert.alert(
          'Search Error',
          'Failed to search items. Please try again.',
          [{ text: 'OK' }]
        );
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleRefresh = async () => {
    if (searchQuery.length <= 2) return;
    
    setRefreshing(true);
    try {
      const response = await searchFlippItems(searchQuery, userLocation);
      setSearchResults(response.items);
    } catch (error) {
      console.error('Refresh error:', error);
      Alert.alert(
        'Refresh Error',
        'Failed to refresh items. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setRefreshing(false);
    }
  };

  if (isLocationLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.searchContainer}>
        <SearchBar 
          onSearch={handleSearch}
        />
      </View>
      <ItemGrid
        items={searchResults}
        isLoading={isLoading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
