import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { findIndex } from 'lodash';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/index';

export default function SignInScreen({ navigation, onSignIn }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isFocussed, setIsFocussed] = useState(false);
  const { users } = useSelector((state) => ({ users: state.app.users }));
  const dispatch = useDispatch();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const index = findIndex(users, {
      email: email.value,
      password: password.value,
    });
    console.log({ index, users, email, password });
    if (index >= 0) {
      dispatch(setUser(users[index]));
      onSignIn();
    }

    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Dashboard' }],
    // });
  };

  const setFocus = () => {
    setIsFocussed(true);
  };

  const resetFocus = () => {
    setIsFocussed(false);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo height={isFocussed ? 100 : 250} />
      <Header>Welcome back!</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onFocus={setFocus}
        onBlur={resetFocus}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        onFocus={setFocus}
        onBlur={resetFocus}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Password Forget')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Sign Up')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
