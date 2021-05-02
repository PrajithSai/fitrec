import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Headline, Caption } from 'react-native-paper';
import moment from 'moment';
import TextInput from '../components/TextInput';
import Check from '../components/Check';
import Pencil from '../components/Pencil';
import { theme } from '../core/theme';
import { exercises } from '../data/exercises';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: 'white',
  },
  goalContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 2,
  },
  recommendationsContainer: {
    alignSelf: 'center',
    minHeight: '70%',
    minWidth: '96%',
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  viewDefault: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  listItem: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgb(244, 239, 239)',
  },
});

const HomeScreen = () => {
  const [timeAvailable, setTimeAvailable] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [showTimeAvailInput, setShowTimeAvailInput] = useState(false);
  const [showCalorieGoalInput, setShowCalorieGoalInput] = useState(false);

  const updateRecommendations = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <View style={styles.viewDefault}>
          <View>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Time Available in minutes
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ justifyContent: 'center', marginLeft: 15 }}>
            <Headline style={{}}>Recommendations</Headline>
            <Caption>{moment(new Date()).format('MMMM Do, YYYY')}</Caption>
          </View>
          <View>
            <TouchableOpacity onPress={updateRecommendations}>
              <Button>Update</Button>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {exercises.map((e) => (
            <List.Item
              key={e.id}
              title={e.name}
              style={styles.listItem}
              description={
                // <View>
                <Text>
                  This is a sample description to check how a long text would
                  show up in the list item.
                </Text>
                // </View>
              }
              left={(props) => (
                <Image
                  {...props}
                  height={35}
                  style={{ marginLeft: 5 }}
                  width={35}
                  source={e.img}
                />
              )}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
