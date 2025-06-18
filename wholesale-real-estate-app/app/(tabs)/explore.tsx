import React from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import PropertyCard from '../../components/ui/PropertyCard';
import { usePropertyContext } from '../../context/PropertyContext';
import { usePropertySearch } from '../../hooks/usePropertySearch';

const ExploreScreen = () => {
  const { properties } = usePropertyContext();
  const { searchText, handleSearch, filteredProperties } = usePropertySearch(properties);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties by address..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Button
          title="Search"
          onPress={() => {}} // Handled by onChangeText
          color="#2c3e50"
        />
      </View>

      {/* Property List Section */}
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Investment Properties</Text>
        <Text style={styles.countText}>{filteredProperties.length} found</Text>
      </View>

      {filteredProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  countText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
});

export default ExploreScreen;