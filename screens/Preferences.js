import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Preferences = () => {
  return (
    <View style={styles.container}>
      <Text>Protected Preferences Screen</Text>
    </View>
  );
};

export default Preferences;
