import React from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '../../services/propertyService';
import PropertyCard from '../../components/ui/PropertyCard';
import { Property } from '../../context/PropertyContext';

const ExploreScreen = () => {
  const [searchText, setSearchText] = React.useState('');
  
  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  const filteredProperties = (properties as Property[]).filter((property: Property) =>
    property.address.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load properties</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Available Properties</Text>
        <Text style={styles.count}>{filteredProperties.length} found</Text>
      </View>

      {filteredProperties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  count: {
    color: '#7f8c8d',
  },
});

export default ExploreScreen;