import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export function MealsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Meal Recommendations</ThemedText>
      <ThemedText>Find meal recommendations and their calorie counts.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
