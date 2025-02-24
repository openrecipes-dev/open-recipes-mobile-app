// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onMenuPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onMenuPress }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search recipes..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.input}
        icon={() => (
          <IconButton
            icon="menu"
            size={24}
            onPress={onMenuPress}
            style={styles.menuIcon}
          />
        )}
        right={() => (
          <IconButton
            icon="magnify"
            size={24}
            onPress={() => onSearch(searchQuery)}
            style={styles.searchIcon}
          />
        )}
        iconColor="#6200ee"
        theme={{
          colors: {
            primary: '#6200ee',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchBar: {
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
  },
  input: {
    fontSize: 16,
    marginLeft: 0,
  },
  menuIcon: {
    margin: 0,
  },
  searchIcon: {
    margin: 0,
  },
});

export default SearchBar;