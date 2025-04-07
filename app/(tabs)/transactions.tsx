import Colors from '@/constants/Colors';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
export default function Transactions() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.text}>Transactions</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  text: { color: Colors.white },
});
