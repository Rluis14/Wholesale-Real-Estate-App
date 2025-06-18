import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePropertyContext } from '../../context/PropertyContext';

const SavedScreen = () => {
  const { savedProperties } = usePropertyContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Properties</Text>
      {savedProperties.length === 0 ? (
        <Text style={styles.emptyText}>No properties saved yet</Text>
      ) : (
        <Text>{savedProperties.length} properties saved</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SavedScreen;