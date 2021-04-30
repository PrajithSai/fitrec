/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  getFocusedRouteNameFromRoute,
  DrawerActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { Button } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import LandingScreen from '../screens/Landing';
import HomeScreen from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import PasswordForgetScreen from '../screens/PasswordForget';
import PasswordChangeScreen from '../screens/PasswordChange';
import AccountScreen from '../screens/Account';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

// const HomeDrawer = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Account" component={AccountScreen} />
//       <Drawer.Screen name="Password Forget" component={PasswordForgetScreen} />
//       <Drawer.Screen name="Password Change" component={PasswordChangeScreen} />
//     </Drawer.Navigator>
//   );
// };

const HomeTabs = () => {
  return <BottomTabNavigator />;
};

export default function Navigation({
  colorScheme,
  handleSignIn,
  isAuthenticated,
  handleSignOut,
  handleSignUp,
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={({ route, navigation }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
              // headerLeft: () => (
              //   <Button
              //     onPress={() =>
              //       navigation.dispatch(DrawerActions.toggleDrawer())
              //     }
              //     title="Menu"
              //   />
              // ),
              headerRight: () => (
                <Button onPress={handleSignOut} title="Sign Out" />
              ),
            })}
          />
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                animationTypeForReplace: 'pop',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Sign In"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <SignIn {...props} onSignIn={handleSignIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="Sign Up"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <SignUp {...props} onSignUp={handleSignUp} />}
            </Stack.Screen>
            <Stack.Screen
              name="Password Forget"
              component={PasswordForgetScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              name="NotFound"
              component={NotFoundScreen}
              options={{ title: 'Oops!' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
