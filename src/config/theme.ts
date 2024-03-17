import {TextStyle, Platform} from 'react-native';

const COLOR = {
  primary: '#FF7034', //'#F86778', //'#2B4E74',
  primaryDark: '#c53f00', //'#b34e24',
  secondary: '#5BB26E', //'#FAB190',
  background: '#ffffff', //'#fbfbfc',
  success: '#1E6F5C',
  info: '#2A528A',
  warn: '#F5B971',
  danger: '#E2363F',
  text1: '#111f2e',
  text2: '#414c58',
  text3: '#8095ac',
  text4: '#f4f6f8',
  border: '#eaedf1',
  white: '#FFFFFF',
  black: '#000000',
};

const SIZE = {
  xs: 4,
  sm: 8,
  m: 16,
  l: 24,
  xl: 32,
  radius: 12,
  marginXS: 4,
  marginSM: 8,
  marginM: 12,
  marginL: 24,
};

/**
 * 1. OpenSans-Light - 300
 * 2. OpenSans-Regular - 400
 * 3. OpenSans-Medium - 500
 * 4. OpenSans-SemiBold - 600
 * 5. OpenSans-Bold - 700
 * 6. OpenSans-ExtraBold - 800
 */
const FONT: {
  [id: string]: TextStyle;
} = {
  h1: {
    fontSize: 34,
    fontFamily: 'OpenSans-SemiBold',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'OpenSans-SemiBold',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
  },
  h3: {
    fontSize: 20,
    fontFamily: 'OpenSans-SemiBold',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
  },
  h4: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
  },
  h5: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '600' : undefined,
  },
  body1: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '400' : undefined,
  },
  body2: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '400' : undefined,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'OpenSans-Medium',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Light',
    color: COLOR.text1,
    fontWeight: Platform.OS === 'ios' ? '300' : undefined,
  },
  button: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
  },
};

const SHADOW = {
  card: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  dp_2: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dp_4: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
};

export default {
  COLOR,
  SIZE,
  FONT,
  SHADOW,
};
