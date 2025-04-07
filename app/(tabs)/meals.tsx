import Colors from '@/constants/Colors';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
// import meals from '@/data/meal.json';
import MealDetail from '@/components/MealDetails';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { useRouter } from 'expo-router';

import { Sparkle, Robot, Brain } from 'phosphor-react-native';
import { useBudgetProvider } from '@/Contexts/BudgetAppContext';

export default function Meals() {
  const router = useRouter();
  const { meals, setMeals } = useBudgetProvider();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 30,
              marginBottom: 10,
            }}>
            My <Text style={{ color: Colors.tintColor }}>Meals</Text>
          </Text>

          <TouchableOpacity
            onPress={() => {
              router.push('/(tabs)/mealSearch');
            }}
            style={{
              marginTop: 20,
              marginBottom: 30,
              padding: 9,
              marginHorizontal: 1,
              backgroundColor: Colors.blue,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
              Find More Cheap Meals
            </Text>

            <Sparkle size={18} color="white" weight="fill" />
          </TouchableOpacity>
          {meals.map((meal) => (
            <MealDetail key={meal.id} meal={meal} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  formText: {
    color: 'white',
  },
});
