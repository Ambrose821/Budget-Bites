import Colors from '@/constants/Colors';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { Sparkle, ArrowRight } from 'phosphor-react-native';
import { Picker } from '@react-native-picker/picker';

import { getAIRecipe, Meal } from '@/scripts/getAIRecipe';

import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';
import MealDetail from '@/components/MealDetails';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBudgetProvider } from '@/Contexts/BudgetAppContext';

export default function MealSearch() {
  const router = useRouter();
  const { meals, setMeals } = useBudgetProvider();
  const [maxTotalPrice, setMaxTotalPrice] = useState('');
  const [desiredServings, setDesiredServings] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('omnivore');
  const [description, setDescription] = useState('');

  const [isWaitingForAI, setIsWaitingForAI] = useState(false);

  const [mealFound, setMealFound] = useState(false);
  const [newMeal, setNewMeal] = useState<Meal | null>(null);

  const saveMeal = (newMeal: Meal) => {
    setMeals((prev: Meal[]) => [newMeal, ...prev]);
    console.log(meals);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        // Page is unfocused (navigated away)
        setMaxTotalPrice('');
        setDesiredServings('');
        setDescription('');
        setDietaryPreference('omnivore');
        setMealFound(false);
        setNewMeal(null);
      };
    }, [])
  );

  const handleSearch = async () => {
    setIsWaitingForAI(true);
    console.log({
      maxTotalPrice: maxTotalPrice,
      desiredServings: desiredServings,
      dietaryPreference,
      description,
    });
    const recipe = await getAIRecipe({
      maxTotalPrice: Number(maxTotalPrice),
      desiredServings: Number(desiredServings),
      dietaryPreference: dietaryPreference,
      description: description,
    });
    console.log(recipe);
    setNewMeal(recipe);
    setIsWaitingForAI(false);
    setMealFound(true);
    // // Navigate back to meals or results page
    // router.push('/(tabs)/meals');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}>
          {!mealFound && (
            <>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                Find <Text style={{ color: Colors.tintColor }}>Meals</Text>
              </Text>
              <View style={styles.formContainer}>
                <Text style={styles.label}>Maximum Total Cost ($)</Text>
                <TextInput
                  style={styles.input}
                  value={maxTotalPrice}
                  onChangeText={setMaxTotalPrice}
                  keyboardType="numeric"
                  placeholder="Enter maximum budget"
                  placeholderTextColor="#666"
                />

                <Text style={styles.label}>Desired Servings</Text>
                <TextInput
                  style={styles.input}
                  value={desiredServings}
                  onChangeText={setDesiredServings}
                  keyboardType="numeric"
                  placeholder="Enter number of servings"
                  placeholderTextColor="#666"
                />

                <Text style={styles.label}>Dietary Preference</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={dietaryPreference}
                    onValueChange={(itemValue) => setDietaryPreference(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="white">
                    <Picker.Item label="Omnivore" value="omnivore" />
                    <Picker.Item label="Vegetarian" value="vegetarian" />
                    <Picker.Item label="Vegan" value="vegan" />
                  </Picker>
                </View>

                <Text style={styles.label}>Additional Preferences (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter any additional preferences or requirements"
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={4}
                />

                <TouchableOpacity
                  onPress={handleSearch}
                  style={{
                    marginTop: 30,
                    padding: 15,
                    backgroundColor: Colors.tintColor,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 8,
                  }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
                    Find Cheap Meals
                  </Text>
                  <ArrowRight size={18} color="white" weight="bold" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push('/(tabs)/meals');
                  }}
                  style={{
                    marginTop: 15,
                    padding: 12,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#444',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: 'white', fontSize: 14 }}>Back to My Meals</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {mealFound && newMeal && (
            <>
              <TouchableOpacity
                onPress={() => {
                  saveMeal(newMeal);
                  router.push('/(tabs)/meals');
                }}
                style={{
                  marginTop: 30,
                  padding: 15,
                  backgroundColor: Colors.tintColor,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 8,
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Save Meal</Text>
                <FontAwesome name="save" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.push('/(tabs)/meals');
                }}
                style={{
                  marginTop: 15,
                  padding: 12,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: '#444',
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 14 }}>Back to My Meals</Text>
              </TouchableOpacity>
              <MealDetail key={newMeal.id} meal={newMeal} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      {isWaitingForAI && (
        <>
          <BlurView
            style={StyleSheet.absoluteFill}
            tint="systemThickMaterialDark"
            intensity={100}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',

              alignSelf: 'center',
              position: 'absolute',
              zIndex: 10,
            }}>
            <LottieView
              source={require('@/assets/loader.json')}
              autoPlay
              loop
              style={{
                width: 150,
                height: 150,
              }}
            />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Finding You an Affordable Recipe
            </Text>
          </View>
        </>
      )}
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
  formContainer: {
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#222',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
