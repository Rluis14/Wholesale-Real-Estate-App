import { Redirect } from 'expo-router';

export default function HomeScreen() {
  // Redirect directly to the Explore tab
  return <Redirect href="/(tabs)/explore" />;
}