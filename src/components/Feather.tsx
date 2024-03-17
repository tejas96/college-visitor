import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import FeatherIcons from 'feather-icons-react';
import theme from '../config/theme';

const {COLOR} = theme;

type Props = {
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
};

const Feather: React.FC<Props> = ({name, color = COLOR.text1, size = 24}) => {
  return <FeatherIcons icon={name} fill={color} size={size} />;
};

export default Feather;
