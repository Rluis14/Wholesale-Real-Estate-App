import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wholesale Real Estate Pro</Text>
      <Text style={styles.subheader}>Find • Analyze • Invest</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Login to access wholesale deals</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2b3c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    color: '#a0b3c6',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#1a2b3c',
  },
});