import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import theme from '../config/theme';
import {VisitorGetPassRequest, VisitorHistory} from '../screens';

const {COLOR, FONT} = theme;

export type VisitorHistoryTabParamList = {
  VisitorHistory: undefined;
  MyRequest: undefined;
};

const Tab = createMaterialTopTabNavigator<VisitorHistoryTabParamList>();

function VisitorHistoryNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: COLOR.background},
        tabBarActiveTintColor: COLOR.text1,
        lazy: true,
        tabBarPressColor: COLOR.border,
        tabBarIndicatorStyle: {backgroundColor: COLOR.primary},
        tabBarLabelStyle: {
          fontFamily: FONT.body1.fontFamily,
          fontSize: FONT.body1.fontSize,
          textTransform: 'none',
        },
      }}>
      <Tab.Screen
        name="VisitorHistory"
        component={VisitorHistory}
        options={{title: 'Approved'}}
      />
      <Tab.Screen
        name="MyRequest"
        component={VisitorGetPassRequest}
        options={{title: 'Pending'}}
      />
    </Tab.Navigator>
  );
}

export default VisitorHistoryNavigation;
