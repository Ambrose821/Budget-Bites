import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';

type Ingredient = {
  item: string;
  cost: string;
};

type MealProps = {
  id: string;
  name: string;
  totalCost: string;
  ingredients: Ingredient[];
  servings: number;
  instructions: string;
  image_url: string;
  type: string;
};

export default function MealDetail({ meal }: { meal: MealProps }) {
  const [showInstructions, setShowInstructions] = useState(false);

  const costPerServing = (parseFloat(meal.totalCost) / meal.servings).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: meal.image_url }} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.mealName}>{meal.name}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.costSection}>
          <View>
            <Text style={styles.label}>Total Cost</Text>
            <Text style={styles.costValue}>${meal.totalCost}</Text>
            <Text style={styles.servingValue}>{meal.type}</Text>
          </View>
          <View style={styles.servingInfo}>
            <Text style={styles.label}>Per Serving</Text>
            <Text style={styles.servingValue}>${costPerServing}</Text>
          </View>
        </View>

        <View style={styles.servingsContainer}>
          <Text style={styles.servingsText}>
            Makes <Text style={styles.servingsNumber}>{meal.servings}</Text> servings
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsContainer}>
          {meal.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{ingredient.item}</Text>
              <Text style={styles.ingredientCost}>${ingredient.cost}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.instructionsButton}
          onPress={() => setShowInstructions(true)}>
          <Text style={styles.buttonText}>View Instructions</Text>
          <FontAwesome name="arrow-right" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {showInstructions && (
        <>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={() => setShowInstructions(false)}>
            <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={80} />
          </TouchableOpacity>
          <View style={styles.instructionsModal}>
            <TouchableOpacity onPress={() => setShowInstructions(false)} style={styles.closeButton}>
              <FontAwesome name="close" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.instructionsTitle}>Instructions</Text>
            <ScrollView style={styles.instructionsScroll}>
              <Text style={styles.instructionsText}>{meal.instructions}</Text>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  mealName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
  },
  costSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 14,
  },
  costValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  servingInfo: {
    alignItems: 'flex-end',
  },
  servingValue: {
    color: Colors.tintColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  servingsContainer: {
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  servingsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  servingsNumber: {
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientsContainer: {
    backgroundColor: Colors.grey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  ingredientName: {
    color: 'white',
    fontSize: 16,
  },
  ingredientCost: {
    color: Colors.tintColor,
    fontSize: 16,
    fontWeight: '500',
  },
  instructionsButton: {
    backgroundColor: Colors.tintColor,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsModal: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    right: '10%',
    height: '70%',
    backgroundColor: Colors.grey,
    borderRadius: 15,
    padding: 20,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: Colors.tintColor,
    zIndex: 11,
  },
  instructionsTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionsScroll: {
    flex: 1,
  },
  instructionsText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
});
