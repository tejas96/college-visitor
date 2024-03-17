import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../config/theme';
import LoginNavigation from './LoginNavigation';
import AppNavigation from './AppNavigation';
import {useAuth} from '../hooks';

const {COLOR} = theme;

export const RootNavigation = () => {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      {user ? (
        <SafeAreaView style={{flex: 1, backgroundColor: COLOR.background}}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={COLOR.background}
          />
          <AppNavigation />
        </SafeAreaView>
      ) : (
        <LoginNavigation />
      )}
    </NavigationContainer>
  );
};
