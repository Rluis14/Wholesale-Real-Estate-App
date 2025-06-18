import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePropertyContext } from '../../context/PropertyContext';
import { Ionicons } from '@expo/vector-icons';

const PropertyDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { properties, savedProperties, toggleSaved } = usePropertyContext();
  
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  const isSaved = savedProperties.includes(property.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#2c3e50" />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.address}>{property.address}</Text>
        <TouchableOpacity onPress={() => toggleSaved(property.id)}>
          <Ionicons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={28} 
            color={isSaved ? "#e74c3c" : "#2c3e50"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Purchase Price:</Text>
          <Text style={styles.value}>{property.price}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>After Repair Value (ARV):</Text>
          <Text style={styles.value}>{property.arv}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Estimated Profit:</Text>
          <Text style={[styles.value, styles.profit]}>{property.profit}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Rehab Estimate:</Text>
          <Text style={styles.value}>{property.rehab}</Text>
        </View>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Property Details</Text>
        <Text style={styles.description}>{property.details}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  address: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profit: {
    color: '#27ae60',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
});

export default PropertyDetailScreen;