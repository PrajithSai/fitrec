import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import { nameValidator } from '../helpers/nameValidator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
  },
  weight: {
    width: '70%',
  },
  weightMetricContainer: {
    flexDirection: 'column',
  },
  heightContainer: {
    flexDirection: 'row',
  },
  heightFeet: {
    flex: 0.8,
  },
  heightInches: {
    flex: 0.6,
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
  },
  gender: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: 'white',
  },
});

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  const [weight, setWeight] = useState({ value: '', error: '' });
  const [heightFeet, setHeightFeet] = useState({ value: '', error: '' });
  const [heightInches, setHeightInches] = useState({ value: '', error: '' });
  const [weightMetric, setWeightMetric] = React.useState('kg');

  const onUpdate = () => {
    const firstNameError = nameValidator(firstName.value);
    const lastNameError = nameValidator(firstName.value);
    const emailError = emailValidator(email.value);
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError });
      setLastName({ ...lastName, error: lastNameError });
      setEmail({ ...email, error: emailError });
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        label="First name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
        disabled
      />
      <TextInput
        label="Last name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
        disabled
      />
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        disabled
      />
      <TextInput
        label="Age in years"
        returnKeyType="done"
        value={age.value}
        onChangeText={(text) => setAge({ value: text, error: '' })}
        error={!!age.error}
        errorText={age.error}
        keyboardType="numeric"
      />
      <TextInput
        label="Weight in kg"
        returnKeyType="done"
        value={weight.value}
        onChangeText={(text) => setWeight({ value: text, error: '' })}
        error={!!weight.error}
        errorText={weight.error}
        keyboardType="numeric"
      />
      <View style={styles.heightContainer}>
        <View style={styles.heightFeet}>
          <TextInput
            label="Height in feet"
            returnKeyType="done"
            value={heightFeet.value}
            onChangeText={(text) => setHeightFeet({ value: text, error: '' })}
            error={!!heightFeet.error}
            errorText={heightFeet.error}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.heightInches}>
          <TextInput
            label="inches"
            returnKeyType="done"
            value={heightInches.value}
            onChangeText={(text) => setHeightInches({ value: text, error: '' })}
            error={!!heightInches.error}
            errorText={heightInches.error}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.genderContainer}>
        <View style={styles.gender}>
          <ToggleButton icon="human-male" value="male" size={45} />
        </View>
        <View style={styles.gender}>
          <ToggleButton icon="human-female" value="female" size={45} />
        </View>
      </View>
      <Button mode="contained" onPress={onUpdate} style={{ marginTop: 24 }}>
        Update
      </Button>
    </KeyboardAvoidingView>
  );
};

export default Profile;
