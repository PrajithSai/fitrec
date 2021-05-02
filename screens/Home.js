import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextInput from '../components/TextInput';
import Check from '../components/Check';
import Pencil from '../components/Pencil';
import { theme } from '../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  goalContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: '',
    marginHorizontal: 2,
  },
  recommendationsContainer: {
    alignSelf: 'center',
    height: '70%',
    borderWidth: 1,
  },
  viewDefault: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: theme.colors.primary,
    borderColor: 'rgb(244, 239, 239)',
    borderRadius: 5,
  },
});

const HomeScreen = () => {
  const [timeAvailable, setTimeAvailable] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [showTimeAvailInput, setShowTimeAvailInput] = useState(false);
  const [showCalorieGoalInput, setShowCalorieGoalInput] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <View style={styles.viewDefault}>
          <View>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Time Available in mins
            </Text>
            {showTimeAvailInput ? (
              <TextInput
                returnKeyType="done"
                value={timeAvailable}
                onChangeText={setTimeAvailable}
                keyboardType="numeric"
              />
            ) : (
              <Text
                style={{
                  fontSize: 70,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {timeAvailable}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowTimeAvailInput(!showTimeAvailInput)}
            style={{ alignSelf: 'flex-end' }}
          >
            {showTimeAvailInput ? (
              <Check
                backgroundColor="white"
                fill="white"
                width={20}
                height={20}
              />
            ) : (
              <Pencil
                backgroundColor="white"
                fill="white"
                width={20}
                height={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewDefault}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Calories to burn
          </Text>
          <View>
            {showCalorieGoalInput ? (
              <TextInput
                returnKeyType="done"
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                keyboardType="numeric"
              />
            ) : (
              <Text
                style={{
                  fontSize: 70,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {calorieGoal}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowCalorieGoalInput(!showCalorieGoalInput)}
            style={{ alignSelf: 'flex-end' }}
          >
            {showCalorieGoalInput ? (
              <Check
                backgroundColor="white"
                fill="white"
                width={20}
                height={20}
              />
            ) : (
              <Pencil
                backgroundColor="white"
                fill="white"
                width={20}
                height={20}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recommendationsContainer}>
        <Text>Recommendations</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
