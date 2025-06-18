import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// Define the Property interface locally since we don't have context yet
interface Property {
  id: string;
  address: string;
  price: string;
  arv: string;
  profit: string;
  rehab?: string;  // Optional property
  details?: string; // Optional property
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/property/${property.id}` as any} asChild>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.address}>{property.address}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>{property.price}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>ARV</Text>
            <Text style={styles.value}>{property.arv}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Profit</Text>
            <Text style={[styles.value, styles.profit]}>{property.profit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  address: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profit: {
    color: '#27ae60',
  },
});

export default PropertyCard;