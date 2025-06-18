import { Slot } from 'expo-router';
import { PropertyProvider } from '../context/PropertyContext';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <PropertyProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Slot />
      </View>
    </PropertyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});