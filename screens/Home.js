import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List, Headline, Caption, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';
import TextInput from '../components/TextInput';
import Check from '../components/Check';
import Pencil from '../components/Pencil';
import { theme } from '../core/theme';
import { exercises } from '../data/exercises';
import Button from '../components/Button';
import { CorrelationCoefficient } from '../data/users';
import { useSelector, useDispatch } from 'react-redux';
import { findIndex, sortBy } from 'lodash';
import Man from '../assets/man.png';
import Woman from '../assets/woman.png';

const topK = 4;

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
    // minHeight: '70%',
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
  const { loggedInUser, users, exerciseWeights } = useSelector((state) => {
    return {
      loggedInUser: state.app.loggedInUser,
      users: state.app.users,
      exerciseWeights: state.app.exerciseWeights,
    };
  });

  const getCaloriesPerHourByActivity = (exercise) => {
    const exWeightIndex = findIndex(exerciseWeights, {
      type: exercise.name.toLowerCase(),
    });
    const ex = exerciseWeights[exWeightIndex];
    const calories =
      Number(ex.w1) +
      Number(loggedInUser.age) * Number(ex.w2) +
      Number(loggedInUser.gender === 'Male' ? 0 : 1) * Number(ex.w3) +
      Number(loggedInUser.weight) * Number(ex.w4) +
      Number(loggedInUser.height || 0) * Number(ex.w5);
    // console.log({ exercise, calories });

    return calories;
  };

  const [timeAvailable, setTimeAvailable] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [showTimeAvailInput, setShowTimeAvailInput] = useState(false);
  const [showCalorieGoalInput, setShowCalorieGoalInput] = useState(false);
  const [showReccs, setShowReccs] = useState(false);
  const [prefs, setPrefs] = useState([]);

  const correlation = CorrelationCoefficient(loggedInUser, users);
  const sortedCorrelation = sortBy(correlation, 'correlation').reverse();
  const recommendedUsers = sortedCorrelation
    .map((c) => ({
      ...users[c.index],
      confidence: Number(c.correlation * 100).toFixed(2),
    }))
    .filter((u) => u.email !== loggedInUser.email);

  const setCustomTime = (e) => (value) => {
    const newPrefs = [...prefs];
    const index = findIndex(prefs, { id: e.id });
    if (index >= 0) {
      newPrefs[index].customTime = Number(value);
    }
    setPrefs(newPrefs);
  };

  const getDescription = (e) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ width: '40%' }}>
          <TextInput
            label="time"
            returnKeyType="done"
            value={`${e.customTime}`}
            onChangeText={setCustomTime(e)}
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: '40%' }}>
          <TextInput
            label="Calories"
            returnKeyType="done"
            value={Number(
              e.caloriesPerHour * (Number(e.customTime) / 60)
            ).toFixed(2)}
            keyboardType="numeric"
            disabled
          />
        </View>
      </View>
    );
  };

  const getCaloriesBurned = () => {
    let caloriesBurned = prefs.reduce(
      (prev, curr) =>
        prev + Number(curr.caloriesPerHour) * (Number(curr.customTime) / 60),
      0
    );
    return Math.ceil(caloriesBurned);
  };

  const getTotalCustomMinutes = () => {
    let totalCustomMins = prefs.reduce(
      (prev, curr) => prev + Number(curr.customTime),
      0
    );
    return {
      totalCustomMins,
      totalCustomHours: Number(totalCustomMins / 60).toFixed(2),
    };
  };

  const { totalCustomMins, totalCustomHours } = getTotalCustomMinutes();
  const totalCaloriesBurned = getCaloriesBurned();

  const getPercentageGoalAcheived = () => {
    return Number((totalCaloriesBurned / calorieGoal) * 100).toFixed(2);
  };

  const percentGoalAcheived = getPercentageGoalAcheived();

  const showRecommendations = () => {
    setShowReccs(true);
    setPrefs(
      sortBy(loggedInUser.preferences, 'preference')
        .reverse()
        .slice(0, topK)
        .map((pref) => {
          const exercise = { ...pref };
          exercise.caloriesPerHour = getCaloriesPerHourByActivity(exercise);
          exercise.customTime = timeAvailable / topK;
          return exercise;
        })
    );
  };
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
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgb(244, 239, 239)',
        }}
      >
        {/* <Caption style={{ position: 'absolute', top: 0 }}>
          {moment(new Date()).format('MMMM Do, YYYY')}
        </Caption> */}
        <View
          style={
            showReccs
              ? {
                  flexDirection: 'row',
                  marginVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgb(244, 239, 239)',
                }
              : {
                  flexDirection: 'row',
                  marginVertical: 10,
                }
          }
        >
          <View style={{ justifyContent: 'center' }}>
            <Headline>Workout Recommendations</Headline>
          </View>
          <View>
            <TouchableOpacity onPress={showRecommendations}>
              <Button>{showReccs ? 'Update' : 'Show'}</Button>
            </TouchableOpacity>
          </View>
        </View>
        {showReccs ? (
          <>
            <Caption style={{ fontSize: 15, padding: 2 }}>
              You will approximately burn{' '}
              <Text style={{ color: theme.colors.primary }}>
                {totalCaloriesBurned} calories
              </Text>{' '}
              in {/* {totalCustomHours} hour  */}
              <Text style={{ color: theme.colors.primary }}>
                {totalCustomMins} minutes.
              </Text>
            </Caption>
            <Caption style={{ fontSize: 15, padding: 2, marginBottom: 15 }}>
              On track to achieve{' '}
              <Text style={{ color: theme.colors.primary }}>
                {percentGoalAcheived}%
              </Text>{' '}
              of your goal for today! {percentGoalAcheived >= 85 ? '👍' : ''}
            </Caption>
          </>
        ) : null}
      </View>
      <ScrollView>
        {showReccs ? (
          <View>
            <View style={styles.recommendationsContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {/* <View>
                <TouchableOpacity onPress={updateRecommendations}>
                  <Button>Update</Button>
                </TouchableOpacity>
              </View> */}
              </View>
              {prefs.map((e) => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: 'rgb(244, 239, 239)',
                    borderWidth: 1,
                    padding: 10,
                  }}
                >
                  <View>
                    <View>
                      <Text style={{ fontSize: 18 }}>{e.name}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ justifyContent: 'center' }}>
                      <Image
                        height={45}
                        style={{ marginLeft: 5, height: 45, width: 45 }}
                        width={45}
                        source={e.img}
                      />
                    </View>
                    {getDescription(e)}
                  </View>
                </View>
              ))}
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
                  <Headline style={{}}>User Recommendations</Headline>
                  <Caption>
                    {moment(new Date()).format('MMMM Do, YYYY')}
                  </Caption>
                </View>
              </View>

              {recommendedUsers.slice(0, topK).map((e) => (
                <List.Item
                  key={e.id}
                  title={`${e.first} ${e.last}`}
                  style={styles.listItem}
                  description={
                    <Caption>
                      Email: {e.email} | Confidence: {e.confidence}
                    </Caption>
                  }
                  left={(props) => (
                    <Image
                      {...props}
                      height={35}
                      style={{ marginLeft: 5 }}
                      width={35}
                      source={e.gender === 'Male' ? Man : Woman}
                    />
                  )}
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={{ margin: 15 }}>
            <Text>Please set your goals for recommendations!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
