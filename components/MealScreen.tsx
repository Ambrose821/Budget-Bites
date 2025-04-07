import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/Header';
import MealDetail from './MealDetails';
import Colors from '@/constants/Colors';
import mealData from '@/data/meal.json';

export default function MealScreen() {
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
          {mealData.map((meal) => (
            <MealDetail key={meal.id} meal={meal} />
          ))}
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
