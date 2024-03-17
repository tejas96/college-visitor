import {StyleSheet} from 'react-native';
import theme from '../../config/theme';
const {COLOR} = theme;

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

export default styles;
