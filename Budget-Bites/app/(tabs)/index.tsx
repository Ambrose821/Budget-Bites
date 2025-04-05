import Colors from '@/constants/Colors';
import { BackHandler, Text, View, StyleSheet, StatusBar } from 'react-native';
import { Stack } from 'expo-router';

import Header from '@/components/Header';
export default function Index() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.black} // Android only
      />
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />

      <View style={styles.contanier}>
        <Text>Budget Bites</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
});
