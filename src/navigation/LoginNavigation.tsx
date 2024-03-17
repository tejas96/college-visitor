import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdminLogin, Login, LoginOption, Otp} from '../screens';
import * as Routes from './routes';

export type LoginStackParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.LOGIN_OPTIONS]: undefined;
  [Routes.ADMIN_LOGIN]: undefined;
  [Routes.OTP]: {
    phone: string;
  };
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LOGIN_OPTIONS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Login} name={Routes.LOGIN} />
      <Stack.Screen component={AdminLogin} name={Routes.ADMIN_LOGIN} />
      <Stack.Screen component={LoginOption} name={Routes.LOGIN_OPTIONS} />
      <Stack.Screen component={Otp} name={Routes.OTP} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
