import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { List, Caption, Subheading } from 'react-native-paper';
import Slider from 'react-native-slider';
import { findIndex } from 'lodash';
import { theme } from '../core/theme';
import { exercises as exercisesData } from '../data/exercises';

const styles = StyleSheet.create({
  container: {},
  listItem: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgb(244, 239, 239)',
    paddingVertical: 10,
  },
});

const Preferences = () => {
  const [exercises, setExercises] = useState(exercisesData);
  const [favorites, setFavorites] = useState({});
  const [expanded, setExpanded] = useState([]);

  const handleFavorites = (exercise) => {
    const favs = { ...favorites };
    if (favs[exercise.id] !== undefined) {
      delete favs[exercise.id];
    } else {
      favs[exercise.id] = exercise;
    }
    setFavorites(favs);
  };

  const handleSliderChange = (exerciseId, preference) => {
    const ex = [...exercises];
    const index = findIndex(ex, { id: exerciseId });
    if (index >= 0) {
      ex[index].preference = preference;
      setExercises(ex);
    }
  };

  const handleAccordionClick = (id) => {
    let e = [...expanded];
    const index = e.indexOf(id);
    if (index >= 0) {
      e.splice(index, 1);
    } else {
      e.push(id);
    }
    setExpanded(e);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises.map((ex) => (
          <List.Accordion
            key={ex.id}
            style={styles.listItem}
            title={ex.name}
            onPress={() => handleAccordionClick(ex.id)}
            expanded={expanded.includes(ex.id)}
            left={(props) => (
              <Image
                {...props}
                style={{ marginLeft: 5, height: 35, width: 35 }}
                source={ex.img}
              />
            )}
          >
            <View
              style={{
                paddingRight: 10,
                backgroundColor: '#f7f7f7',
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Caption>01 - Least Preferred </Caption>
                <Caption>10 - Most Preferred </Caption>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={ex.preference}
                onValueChange={(val) => handleSliderChange(ex.id, val)}
                trackStyle={{
                  height: 2,
                  borderRadius: 1,
                }}
                thumbStyle={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: 'white',
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 2,
                  shadowOpacity: 0.35,
                }}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={'#b7b7b7'}
              />
              <Subheading
              // style={{ marginBottom: 5, fontSize: 15, fontWeight: '600' }}
              >
                Current Preference: {ex.preference}
              </Subheading>
            </View>
          </List.Accordion>
        ))}
      </View>
    </ScrollView>
  );
};

export default Preferences;
