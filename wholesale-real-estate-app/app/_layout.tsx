import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropertyProvider } from '../context/PropertyContext';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PropertyProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
      </PropertyProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});