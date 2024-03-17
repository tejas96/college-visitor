import React from 'react';
import {View} from 'react-native';
import globalStyles from '../global/styles';
import Text from './Text';

interface Props {
  message: string;
  children?: React.ReactNode;
}

const NoData: React.FC<Props> = ({message, children}) => {
  return (
    <View
      style={[
        globalStyles.flex1,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
      ]}>
      <Text variant="headlineLarge">{message}</Text>
      {children}
    </View>
  );
};

export default NoData;
