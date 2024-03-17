import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {Button, Screen, TextInputBox} from '../../components';
import Text from '../../components/Text';
import globalStyles from '../../global/styles';
import {AppNavigationProps} from '../../navigation';
import {useAuth} from '../../hooks';

const AdminLogin: React.FC = () => {
  const {signInWithEmailAndPassword} = useAuth();
  const navigation = useNavigation<AppNavigationProps>();
  const [error, setError] = useState<string>('');
  const [loginCred, setLoginCred] = useState({
    userName: '',
    password: '',
  });

  const handleLoginPress = () => {
    if (loginCred.password !== 'admin' && loginCred.userName !== 'admin') {
      setError(() => 'Wrong user credentials');
      return;
    }
    signInWithEmailAndPassword(loginCred.userName, loginCred.password)
      .then(() => {
        navigation.navigate('Splash');
      })
      .catch(() => {
        setError(() => 'Wrong user credentials');
      })
      .finally(() => {
        setError(() => '');
      });
  };

  const handleOnInputChange = (val: string, name: string) => {
    setLoginCred(prevState => ({...prevState, [name]: val}));
  };

  return (
    <Screen>
      <Text color="primary" variant="displayMedium">
        Admin Login Portal
      </Text>
      <TextInputBox
        value={loginCred.userName}
        name="userName"
        onInputChange={handleOnInputChange}
        label={'User Name'}
        style={[globalStyles.mt10]}
      />
      <TextInputBox
        value={loginCred.userName}
        keyboardType="visible-password"
        name="password"
        onInputChange={handleOnInputChange}
        label={'Password'}
        style={[globalStyles.mt10]}
      />
      <Button
        style={[globalStyles.mt20]}
        text="Login"
        onPress={handleLoginPress}
      />
      <View style={[globalStyles.alignCenter]}>
        {error ? (
          <HelperText variant="titleMedium" type="error" visible={true}>
            {error}
          </HelperText>
        ) : null}
      </View>
    </Screen>
  );
};

export default AdminLogin;
