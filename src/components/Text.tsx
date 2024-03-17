import React from 'react';
import {Text as PaperText} from 'react-native-paper';
import theme from '../config/theme';

const {COLOR} = theme;
type ColorValues = keyof typeof COLOR;

type IProps = React.ComponentProps<typeof PaperText> & {
  fontWeight?: '900' | 'bold' | '400' | 'normal';
  children: React.ReactNode;
  color?: ColorValues;
};

const Text: React.FC<IProps> = ({
  children,
  fontWeight = 'normal',
  color,
  ...props
}) => {
  return (
    <PaperText
      style={[{fontWeight, color: COLOR[color || 'black']}]}
      {...props}>
      {children}
    </PaperText>
  );
};

export default Text;
