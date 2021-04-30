import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Logo1 from '../components/Logo1';
import Logo2 from '../components/Logo2';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

export default function LandingScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>FitRec</Header>
      <Paragraph>
        The easiest way to get recommedations to reach your fitness goals.
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('Sign In')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Sign Up')}>
        Sign Up
      </Button>
    </Background>
  );
}
