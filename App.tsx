/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {RootNavigation} from './src/navigation/RootNavigation';
import AuthProvider from './src/providers/AuthProvider';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

export default App;
