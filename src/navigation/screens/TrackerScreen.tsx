import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DonutChart from '@/components/DonutChart';
import { IconSymbol } from '@/components/ui/IconSymbol';

const mealColors = ['#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40', '#ff6384'];

export function TrackerScreen() {
  const [meals, setMeals] = useState([
    { name: 'Breakfast', calories: 350, color: mealColors[0] },
    { name: 'Lunch', calories: 550, color: mealColors[1] },
    { name: 'Dinner', calories: 450, color: mealColors[2] },
  ]);
  const [burnedCalories, setBurnedCalories] = useState(300);
  const [waterIntake, setWaterIntake] = useState(4);

  const goalCalories = 2000;

  const handleAddMeal = () => {
    setMeals([
      ...meals,
      {
        name: `Meal ${meals.length + 1}`,
        calories: 0,
        color: mealColors[meals.length % mealColors.length],
      },
    ]);
  };

  const handleMealChange = (index, key, value) => {
    const newMeals = [...meals];
    newMeals[index][key] = value;
    setMeals(newMeals);
  };

  const consumedCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>Today's Report</ThemedText>
        <DonutChart
          meals={meals}
          burnedCalories={burnedCalories}
          goalCalories={goalCalories}
        />

        <View style={styles.section}>
          <ThemedText type="subtitle">Meals</ThemedText>
          {meals.map((meal, index) => (
            <View key={index} style={styles.mealContainer}>
              <View style={[styles.mealColorDot, { backgroundColor: meal.color }]} />
              <TextInput
                style={styles.mealInput}
                value={meal.name}
                onChangeText={(text) => handleMealChange(index, 'name', text)}
              />
              <TextInput
                style={styles.calorieInput}
                value={String(meal.calories)}
                keyboardType="numeric"
                onChangeText={(text) => handleMealChange(index, 'calories', Number(text))}
              />
              <ThemedText>kcal</ThemedText>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMeal}>
            <ThemedText style={styles.addButtonText}>Add Meal</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Burned Calories</ThemedText>
          <View style={styles.burnedContainer}>
            <TextInput
              style={styles.calorieInput}
              value={String(burnedCalories)}
              keyboardType="numeric"
              onChangeText={(text) => setBurnedCalories(Number(text))}
            />
            <ThemedText>kcal</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Water Intake</ThemedText>
          <View style={styles.waterContainer}>
            <TouchableOpacity onPress={() => setWaterIntake(waterIntake > 0 ? waterIntake - 1 : 0)}>
              <IconSymbol name="minus" size={24} color="#4e9af1" />
            </TouchableOpacity>
            <ThemedText style={styles.waterText}>{waterIntake} glasses</ThemedText>
            <TouchableOpacity onPress={() => setWaterIntake(waterIntake + 1)}>
              <IconSymbol name="plus" size={24} color="#4e9af1" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summarySection}>
          <ThemedText type="subtitle">Total Calories</ThemedText>
          <ThemedText>Consumed: {consumedCalories} kcal</ThemedText>
          <ThemedText>Burned: {burnedCalories} kcal</ThemedText>
          <ThemedText style={styles.netCalories}>Net: {consumedCalories - burnedCalories} kcal</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  mealInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 5,
  },
  calorieInput: {
    width: 60,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
    padding: 5,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#4e9af1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  burnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  waterText: {
    fontSize: 18,
  },
  summarySection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  netCalories: {
    fontWeight: 'bold',
    marginTop: 5,
  },
});
