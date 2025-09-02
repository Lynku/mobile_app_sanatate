import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import meals from '../../data/meals.json';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Meal {
  id: number;
  name: string;
  calories: number;
  items: string[];
  howto: string;
  vitamins: string;
  protein: string;
  image: string;
}

const MealItem = ({ meal, onPress }: { meal: Meal; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
    <Image source={{ uri: meal.image }} style={styles.image} />
    <View style={styles.infoContainer}>
      <ThemedText type="subtitle">{meal.name}</ThemedText>
      <ThemedText>{meal.calories} kcal</ThemedText>
    </View>
  </TouchableOpacity>
);

const MealDetail = ({ meal, onBack }: { meal: Meal; onBack: () => void }) => (
  <ScrollView style={styles.detailContainer}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <ThemedText type="link">{'<'} Back to list</ThemedText>
    </TouchableOpacity>
    <Image source={{ uri: meal.image }} style={styles.detailImage} />
    <ThemedText type="title" style={styles.detailTitle}>{meal.name}</ThemedText>
    <ThemedText style={styles.detailText}><ThemedText type="defaultSemiBold">Calories:</ThemedText> {meal.calories} kcal</ThemedText>
    <ThemedText style={styles.detailText}><ThemedText type="defaultSemiBold">Protein:</ThemedText> {meal.protein}</ThemedText>
    <ThemedText style={styles.detailText}><ThemedText type="defaultSemiBold">Vitamins:</ThemedText> {meal.vitamins}</ThemedText>
    <ThemedText type="subtitle" style={styles.detailSubtitle}>Ingredients:</ThemedText>
    {meal.items.map((item, index) => (
      <ThemedText key={index} style={styles.detailText}>- {item}</ThemedText>
    ))}
    <ThemedText type="subtitle" style={styles.detailSubtitle}>How to prepare:</ThemedText>
    <ThemedText style={styles.detailText}>{meal.howto}</ThemedText>
  </ScrollView>
);

export function MealsScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const mealsPerPage = 3;

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(meals.length / mealsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (selectedMeal) {
    return <MealDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Meals</ThemedText>
      <View>
        {currentMeals.map(meal => (
          <MealItem key={meal.id} meal={meal} onPress={() => setSelectedMeal(meal)} />
        ))}
      </View>
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1} style={styles.pageButton}>
          <ThemedText type="link">Previous</ThemedText>
        </TouchableOpacity>
        <ThemedText>{`Page ${currentPage} of ${totalPages}`}</ThemedText>
        <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages} style={styles.pageButton}>
          <ThemedText type="link">Next</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageButton: {
    padding: 8,
  },
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailTitle: {
    marginBottom: 8,
  },
  detailSubtitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  detailText: {
    marginBottom: 4,
    lineHeight: 20,
  },
});