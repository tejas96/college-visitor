import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import theme from '../config/theme';

const {FONT, COLOR} = theme;
type colorValues = keyof typeof COLOR;

interface IProps {
  text: string;
  onPress?: () => void;
  disable?: boolean;
  variant?: 'filled' | 'outlined' | 'text' | 'contained-tonal';
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  icon?: IconSource;
  dark?: boolean;
  compact?: boolean;
  color?: colorValues;
  uppercase?: boolean;
  accessibilityLabel?: string;
  onLongPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const Button: React.FC<IProps> = ({
  text,
  onPress,
  disable = false,
  variant = 'filled',
  style,
  loading = false,
  icon,
  dark = true,
  compact,
  color,
  uppercase = false,
  accessibilityLabel = 'Button',
  onLongPress,
  contentStyle,
  labelStyle,
  testID,
}) => {
  const mode = variant === 'filled' ? 'contained' : variant;
  const themeProps = {} as any;
  const styleProp = {} as any;
  if (variant === 'filled') {
    themeProps.buttonColor = COLOR[color || 'primary'];
  }
  if (variant === 'text') {
    themeProps.textColor = COLOR[color || 'primary'];
  }

  if (variant === 'outlined') {
    styleProp.borderColor = COLOR[color || 'primary'];
    themeProps.textColor = COLOR[color || 'primary'];
  }

  return (
    <PaperButton
      onPress={() => {
        if (!loading) {
          onPress?.();
        }
      }}
      disabled={disable}
      mode={mode}
      style={[style, styleProp]}
      loading={loading}
      icon={icon}
      dark={dark}
      compact={compact}
      uppercase={uppercase}
      accessibilityLabel={accessibilityLabel}
      onLongPress={onLongPress}
      contentStyle={[styles.buttonContainer, contentStyle]}
      labelStyle={[styles.buttonText, labelStyle]}
      testID={testID}
      {...themeProps}>
      {text}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
  },
  buttonText: {
    ...FONT.button,
  },
});

export default Button;
