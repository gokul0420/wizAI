import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SeverityCircle = ({ value }: { value: number }) => {
  // Ensure value is between 1 and 100
  const clampedValue = Math.max(1, Math.min(100, value));

  // Calculate the stroke dasharray based on the percentage value
  const radius = 16; // Adjusted radius for 40x40 circle (diameter 40, radius 20)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDasharray = (clampedValue / 100) * circumference;
  const strokeDashoffset = circumference - strokeDasharray; // This shifts the stroke

  // Determine the color based on the value
  let color = 'green';
  if (clampedValue > 50 && clampedValue <= 75) {
    color = `rgb(255, ${Math.floor((clampedValue - 50) * 5)}, 0)`; // yellow
  } else if (clampedValue > 75) {
    color = `rgb(${Math.min(255, Math.floor((clampedValue - 75) * 10))}, 0, 0)`; // red
  }

  return (
    <View style={styles.container}>
      <Svg width="40" height="40" viewBox="0 0 40 40">
        {/* Background Circle */}
        <Circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx="20"
          cy="20"
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${strokeDasharray} ${circumference}`}
          strokeDashoffset={0} // Controls the fill
          strokeLinecap="round"
          rotation="-90" // Rotate to start from the top (12 o'clock position)
          origin="20, 20" // This sets the rotation origin to the center of the circle
        />
      </Svg>
      <Text style={styles.text}>{clampedValue}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, // Adjust size of the circle container
    height: 40,
  },
  text: {
    position: 'absolute',
    fontSize: 10, // Smaller font size for the smaller circle
    fontWeight: 'bold',
  },
});

export default SeverityCircle;
