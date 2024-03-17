import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    rowGap: 10,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
  },
  btnGrp: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    marginTop: 20,
  },

  textGrp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
});

export default styles;
