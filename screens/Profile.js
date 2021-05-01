import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Title } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import { nameValidator } from '../helpers/nameValidator';
import { theme } from '../core/theme';

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
    flex: 0.5,
  },
  heightInches: {
    flex: 0.5,
    marginLeft: 10,
  },
  genderContainer: {
    marginTop: 15,
    width: '100%',
  },
  tabStyle: { height: 45, borderColor: theme.colors.primary },
  activeTabStyle: { backgroundColor: theme.colors.primary },
  tabTextStyle: { color: theme.colors.primary, fontSize: 16 },
  bmrContainer: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const GENDERS = ['Male', 'Female'];

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [lastName, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [age, setAge] = useState({ value: '', error: '' });
  const [weight, setWeight] = useState({ value: '', error: '' });
  const [gender, setGender] = useState({ value: 0, error: '' });
  const [heightFeet, setHeightFeet] = useState({ value: '', error: '' });
  const [heightInches, setHeightInches] = useState({ value: '', error: '' });
  // const [bmr, setBMR] = useState('');

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

  const getHeightInCM = () => {
    const heightInInches = Number(heightFeet.value) * 12;
    return (heightInInches + Number(heightInches.value)) * 2.54;
  };

  const getBMR = () => {
    if (
      gender.value >= 0 &&
      heightFeet.value &&
      heightInches.value &&
      weight.value &&
      age.value
    ) {
      const isMale = GENDERS[gender.value] === 'Male';
      const constant = isMale ? 5 : -161;
      const height = getHeightInCM();
      const bmr =
        10 * weight.value + 6.25 * height - 5 * Number(age.value) + constant;
      return bmr;
    }
    return '';
    // setBMR(bmr);
  };

  const handleUpdate = () => {
    navigation.navigate('Home');
  };

  const bmr = getBMR();
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
        <SegmentedControlTab
          values={GENDERS}
          selectedIndex={gender.value}
          onTabPress={(value) => setGender({ value, error: '' })}
          borderRadius={3}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
        />
      </View>
      {bmr !== '' && (
        <View style={styles.bmrContainer}>
          <Title>
            Your BMR is {bmr} calories/day or {Number(bmr / 24).toFixed(2)}{' '}
            calories/hour
          </Title>
        </View>
      )}
      <Button mode="contained" onPress={handleUpdate} style={{ marginTop: 24 }}>
        Update
      </Button>
    </KeyboardAvoidingView>
  );
};

export default Profile;
