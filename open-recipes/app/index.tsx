import { StyleSheet, Text, View } from "react-native";
import SearchBar from '@/src/components/SearchBar';
export default function Page() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  return (
    
    <View style={styles.container}>
   
      {/* Rest of your screen content */}
      <View style={styles.main}>
      <SearchBar 
        onSearch={handleSearch}
        onMenuPress={handleMenuPress}
      />
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
