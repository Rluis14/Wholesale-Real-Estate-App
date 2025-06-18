import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';


export default function App() {

  const [properties] = useState([
    { id: '1', address: '123 Main St', price: '$150,000', status: 'Available' },
    { id: '2', address: '456 Elm St', price: '$200,000', status: 'Under Contract' },
    { id: '3', address: '789 Oak St', price: '$175,000', status: 'Sold' },
    { id: '4', address: '321 Pine St', price: '$225,000', status: 'Available' },
    { id: '5', address: '654 Maple St', price: '$300,000', status: 'Available' },
    { id: '6', address: '987 Cedar St', price: '$180,000', status: 'Under Contract' },
    { id: '7', address: '159 Birch St', price: '$210,000', status: 'Sold' },
    { id: '8', address: '753 Spruce St', price: '$190,000', status: 'Available' },
    { id: '9', address: '852 Willow St', price: '$230,000', status: 'Available' },
    { id: '10', address: '369 Chestnut St', price: '$280,000', status: 'Under Contract' },
  ]);

  const [searchText, setSearchText] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  //search function
  const handleSearch = () => {
    if (searchText.trim() === '') {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(property =>
      property.address.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredProperties(filtered);
  };

  function renderPropertyItem({ item }: { item: { id: string; address: string; price: string; status: string; } }) {
    return (
      <View style={styles.propertyCard}>
        <Text style={styles.propertyAddress}>{item.address}</Text>
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyText}>{item.price}</Text>
          <Text style={styles.propertyText}>{item.status}</Text>
        </View>
      </View>
    );
  }
  return (
     <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button
          title="Search"
          onPress={handleSearch}
          color="#2c3e50"
        />
      </View>

      {/* Property List Section */}
      <Text style={styles.sectionTitle}>Featured Wholesale Properties</Text>
      
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyItem}
        keyExtractor={item => item.id}
        scrollEnabled={false} // Disable internal scrolling
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyAddress: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});