/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Routes from './routes';
import {VisitorAccount, VisitorRegistration} from '../screens';
import theme from '../config/theme';
import {Dimensions, View} from 'react-native';
import Text from '../components/Text';
import VisitorHistoryNavigation, {
  VisitorHistoryTabParamList,
} from './VisitorHistoryNavigation';
import {NavigatorScreenParams} from '@react-navigation/native';

const {COLOR, FONT} = theme;
const {width} = Dimensions.get('window');

export type VisitorBottomTabParamList = {
  [Routes.VISITOR_HOME]: NavigatorScreenParams<VisitorHistoryTabParamList>;
  [Routes.VISITOR_ACCOUNT]: undefined;
  [Routes.VISITOR_REGISTRATION]: undefined;
};

const Tab = createBottomTabNavigator<VisitorBottomTabParamList>();

type TabIconProps = {
  icon: string;
  color: string;
  label: string;
  showBadge?: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({
  // icon,
  label,
  color,
  showBadge = false,
}) => {
  return (
    <View
      style={{
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5,
      }}>
      <View>
        {/* <FeatherIcon icon={icon} size={24} fill={color} /> */}
        {showBadge && (
          <View
            style={{
              height: 6,
              width: 6,
              borderRadius: 3,
              backgroundColor: COLOR.primary,
              position: 'absolute',
              top: 0,
              right: -4,
            }}
          />
        )}
      </View>
      <Text
        allowFontScaling={false}
        style={[
          FONT.caption,
          {
            color,
            textAlign: 'center',
            width: '100%',
            marginTop: 4,
          },
        ]}>
        {label}
      </Text>
    </View>
  );
};

function VisitorBottomTabNavigation() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: 8,
          height: 60,
        },
        headerShown: false,
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: COLOR.text3,
      }}>
      <Tab.Screen
        name={Routes.VISITOR_REGISTRATION}
        component={VisitorRegistration}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="register" label="Pass" color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Routes.VISITOR_HOME}
        component={VisitorHistoryNavigation}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="home" label="Home" color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={Routes.VISITOR_ACCOUNT}
        component={VisitorAccount}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="account" label="Account" color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default VisitorBottomTabNavigation;
