import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Routes from './routes';
import {Splash} from '../screens';
import AdminBottomTabNavigation, {
  AdminBottomTabParamList,
} from './AdminBottomTabNavigation';
import VisitorBottomTabNavigation, {
  VisitorBottomTabParamList,
} from './VisitorBottomTabNavigation';

export type AppStackParamList = {
  [Routes.SPLASH]: undefined;
  [Routes.VISITOR_BOTTOM_TAB]: NavigatorScreenParams<VisitorBottomTabParamList>;
  [Routes.ADMIN_BOTTOM_TAB]: NavigatorScreenParams<AdminBottomTabParamList>;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SPLASH}
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Splash} name={Routes.SPLASH} />
      <Stack.Screen
        component={AdminBottomTabNavigation}
        name={Routes.ADMIN_BOTTOM_TAB}
      />
      <Stack.Screen
        component={VisitorBottomTabNavigation}
        name={Routes.VISITOR_BOTTOM_TAB}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
