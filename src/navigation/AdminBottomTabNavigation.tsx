/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Routes from './routes';
import {AdminAccount, AdminDashboard, AdminRegistration} from '../screens';
import theme from '../config/theme';
import {Dimensions, View} from 'react-native';
import Text from '../components/Text';

const {COLOR, FONT} = theme;
const {width} = Dimensions.get('window');

export type AdminBottomTabParamList = {
  [Routes.ADMIN_REGISTRATION]: undefined;
  [Routes.ADMIN_HOME]: undefined;
  [Routes.ADMIN_ACCOUNT]: undefined;
};

const Tab = createBottomTabNavigator<AdminBottomTabParamList>();

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

function AdminBottomTabNavigation() {
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
        name={Routes.ADMIN_REGISTRATION}
        component={AdminRegistration}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="register" label="pass" color={color} />;
          },
        }}
      />

      <Tab.Screen
        name={Routes.ADMIN_HOME}
        component={AdminDashboard}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="home" label="Home" color={color} />;
          },
        }}
      />

      <Tab.Screen
        name={Routes.ADMIN_ACCOUNT}
        component={AdminAccount}
        options={{
          tabBarIcon: ({color}) => {
            return <TabIcon icon="account" label="Account" color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default AdminBottomTabNavigation;
