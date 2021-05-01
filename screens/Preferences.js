import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';
import { List } from 'react-native-paper';
import { findIndex } from 'lodash';
import { exercises } from '../data/exercises';
import Star from '../assets/star.png';
import StarSelected from '../assets/star_selected.png';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 25,
  },
  listItem: {
    // marginLeft: 10,
    // marginRight: 25,
    borderWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#e7e4e4',
    borderColor: 'rgb(244, 239, 239)',
    // marginTop: 15,
    paddingVertical: 10,
  },
});

const Preferences = () => {
  const [favorites, setFavorites] = useState({});

  const handleFavorites = (exercise) => {
    const favs = { ...favorites };
    if (favs[exercise.id] !== undefined) {
      delete favs[exercise.id];
    } else {
      favs[exercise.id] = exercise;
    }
    setFavorites(favs);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises.map((ex) => (
          <List.Item
            key={ex.id}
            style={styles.listItem}
            title={ex.name}
            left={(props) => (
              <Image
                {...props}
                height={35}
                style={{ marginLeft: 5 }}
                width={35}
                source={ex.img}
              />
            )}
            right={(props) => (
              <TouchableOpacity
                style={{ paddingRight: 25 }}
                onPress={() => handleFavorites(ex)}
              >
                <Image
                  {...props}
                  height={20}
                  width={20}
                  source={favorites[ex.id] !== undefined ? StarSelected : Star}
                />
              </TouchableOpacity>
            )}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Preferences;
