import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Schedule: undefined;
  Booking: undefined;
  SignIn: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
