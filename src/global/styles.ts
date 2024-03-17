import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  // Margin Styles
  mt5: {marginTop: 5},
  mt10: {marginTop: 10},
  mt20: {marginTop: 20},
  mb5: {marginBottom: 5},
  mb10: {marginBottom: 10},
  ml5: {marginLeft: 5},
  ml10: {marginLeft: 10},
  mr5: {marginRight: 5},
  mr10: {marginRight: 10},

  // Padding Styles
  pb5: {paddingBottom: 5},
  pt5: {paddingTop: 5},
  pl5: {paddingLeft: 5},
  pr5: {paddingRight: 5},
  paddingHorizontal5: {paddingHorizontal: 5},
  paddingHorizontal10: {paddingHorizontal: 10},
  paddingVertical5: {paddingVertical: 5},
  paddingVertical10: {paddingVertical: 10},

  // BorderRadius Styles
  borderRadius5: {borderRadius: 5},
  borderRadius10: {borderRadius: 10},

  // Flex Container Styles
  flexRow: {flexDirection: 'row'},
  flexColumn: {flexDirection: 'column'},

  // Alignment Styles
  alignCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  alignEnd: {alignItems: 'flex-end'},
  justifySpaceBetween: {justifyContent: 'space-between'},

  // Margin and Padding Sizes
  m25: {margin: 25},
  m30: {margin: 30},
  mh25: {marginHorizontal: 25},
  mh30: {marginHorizontal: 30},
  mv25: {marginVertical: 25},
  mv30: {marginVertical: 30},
  p25: {padding: 25},
  p30: {padding: 30},
  ph25: {paddingHorizontal: 25},
  ph30: {paddingHorizontal: 30},
  pv25: {paddingVertical: 25},
  pv30: {paddingVertical: 30},

  // Border Styles
  borderWidth1: {borderWidth: 1},
  borderWidth2: {borderWidth: 2},
  borderColorGray: {borderColor: 'gray'},
  borderColorPrimary: {borderColor: 'blue'},

  // Text Styles
  textBold: {fontWeight: 'bold'},
  textSize16: {fontSize: 16},
  textColorRed: {color: 'red'},

  // Flex Styles
  flex1: {flex: 1},
  fullWidth: {width: '100%'},
  // Add more reusable styles as needed
});

export default globalStyles;
