import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackParamList} from './LoginNavigation';
import {AppStackParamList} from './AppNavigation';

export type LoginNavigationProps =
  NativeStackNavigationProp<LoginStackParamList>;

export type AppNavigationProps = NativeStackNavigationProp<AppStackParamList>;
