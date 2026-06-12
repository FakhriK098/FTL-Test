import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './interface';
import WelcomePage from '../ui/pages/Welcome/WelcomePage';
import SignInPage from '../ui/pages/SignIn/SignInPage';
import HomePage from '../ui/pages/Home/HomePage';
import BookingPage from '../ui/pages/Booking/BookingPage';
import SchedulePage from '../ui/pages/Schedule/SchedulePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Booking" component={BookingPage} />
      <Stack.Screen name="Schedule" component={SchedulePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
