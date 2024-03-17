import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Button, Screen} from '../../components';
import Text from '../../components/Text';
import {LoginNavigationProps} from '../../navigation';
import {useNavigation} from '@react-navigation/native';

const LoginOption: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProps>();
  return (
    <Screen disableScrollView viewProps={{style: styles.container}}>
      <View style={styles.textGrp}>
        <Text color="primary" fontWeight="bold" variant="displayLarge">
          Welcome to{' '}
        </Text>
        <Text fontWeight="bold" variant="displayLarge">
          <Text color="primary" fontWeight="bold">
            V
          </Text>
          <Text fontWeight="bold">istor</Text>
          <Text color="primary" fontWeight="bold">
            G
          </Text>
          <Text fontWeight="bold">ate</Text>
        </Text>
        <Text color="info" variant="titleSmall">
          Unlocking Campus Access, Seamlessly.
        </Text>
      </View>
      <View style={styles.btnGrp}>
        <Button
          variant="outlined"
          onPress={() => {
            navigation.navigate('AdminLogin');
          }}
          text="ADMIN"
        />
        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
          text="VISITOR"
        />
      </View>
    </Screen>
  );
};

export default LoginOption;
