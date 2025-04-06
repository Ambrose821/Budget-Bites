import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import MealDetail from './MealDetails';
import Colors from '@/constants/Colors';

export default function MealScreen() {
  // This would typically come from an API or state
  const mealData = {
    id: '1',
    name: 'Fusili A la chicken',
    totalCost: '26.00',
    ingredients: [
      { item: 'chicken breast', cost: '12.00' },
      { item: 'fusili pasta', cost: '8.00' },
      { item: 'Sauce', cost: '6.00' },
    ],
    servings: 8,
    instructions: 'Heat up your saucepan at medium to high heat.......',
    image_url:
      'https://www.shutterstock.com/image-photo/chicken-alfredo-penne-creamy-pasta-600nw-2430169591.jpg',
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <MealDetail meal={mealData} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
