import React from 'react';
import {ColorValue, Text, View} from 'react-native';
import theme from '../config/theme';
import LottieView from 'lottie-react-native';

const {COLOR, FONT} = theme;

interface IProps {
  backgroundColor?: ColorValue;
  isLoading: boolean;
  loadingMessage?: string;
  children?: React.ReactNode;
}

const Loader: React.FC<IProps> = ({
  backgroundColor = COLOR.background,
  loadingMessage,
  isLoading = true,
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor,
      }}>
      <LottieView
        source={require('../assets/lottie/loader.json')}
        autoPlay
        loop
        style={{width: 60, height: 60}}
      />
      {loadingMessage && (
        <Text
          style={{
            ...FONT.body2,
            color: COLOR.text3,
            textAlign: 'center',
            marginTop: 8,
          }}>
          {loadingMessage}
        </Text>
      )}
    </View>
  );
};

export default Loader;
