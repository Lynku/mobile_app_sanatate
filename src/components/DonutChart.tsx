import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ThemedText } from './ThemedText';

const DonutChart = ({ meals, burnedCalories, goalCalories }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.8;
  const radius = chartWidth / 2 - 30;
  const circumference = 2 * Math.PI * radius;

  let cumulativeCalories = 0;

  const consumedCalories = meals.reduce((total, meal) => total + meal.calories, 0);

  return (
    <View style={[styles.chartContainer, { width: chartWidth, height: chartWidth }]}>
      <Svg height={chartWidth} width={chartWidth} viewBox={`0 0 ${chartWidth} ${chartWidth}`}>
        {/* Background Circle */}
        <Circle
          cx={chartWidth / 2}
          cy={chartWidth / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="30"
          fill="transparent"
        />

        {/* Meal Arcs */}
        {meals.map((meal, index) => {
          if (meal.calories === 0) return null;

          const percentage = meal.calories / goalCalories;
          const strokeDashoffset = circumference * (1 - percentage);
          const rotation = (cumulativeCalories / goalCalories) * 360;
          cumulativeCalories += meal.calories;

          return (
            <Circle
              key={index}
              cx={chartWidth / 2}
              cy={chartWidth / 2}
              r={radius}
              stroke={meal.color}
              strokeWidth="25"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(${rotation}, ${chartWidth / 2}, ${chartWidth / 2})`}
            />
          );
        })}
      </Svg>
      <View style={styles.chartTextContainer}>
        <ThemedText style={styles.consumedText}>{consumedCalories} kcal</ThemedText>
        <ThemedText style={styles.goalText}>Consumed</ThemedText>
        <ThemedText style={[styles.burnedText, { color: '#ff6384' }]}>
          {burnedCalories} kcal
        </ThemedText>
        <ThemedText style={styles.goalText}>Burned</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  chartTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consumedText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  burnedText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  goalText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DonutChart;
