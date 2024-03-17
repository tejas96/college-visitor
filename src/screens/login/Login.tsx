import React, {useState} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {Button, Screen, TextInputBox} from '../../components';
import Text from '../../components/Text';
import globalStyles from '../../global/styles';
import {useAuth} from '../../hooks';
import {LoginNavigationProps} from '../../navigation';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';

const schema = yup.object().shape({
  phoneNo: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
});

function Login() {
  const navigation = useNavigation<LoginNavigationProps>();
  const {signInWithPhoneNumber} = useAuth();
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleOtpSendPress = async () => {
    const isValid = await validateInputs();
    if (isValid) {
      setLoading(() => true);
      await signInWithPhoneNumber(phoneNo)
        .then(() => {
          navigation.navigate('Otp', {phone: phoneNo});
        })
        .catch(err => {
          setError(() => err.message);
        })
        .finally(() => {
          setLoading(() => false);
        });
    }
  };

  const validateInputs = async (): Promise<boolean> => {
    try {
      await schema.validate({phoneNo}, {abortEarly: true});
      setError(() => '');
      return true;
    } catch (err: any) {
      setError(() => err.message);
      return false;
    }
  };

  return (
    <Screen viewProps={{style: styles.loginScreenContainer}} disableScrollView>
      <View style={[globalStyles.fullWidth]}>
        <Text color="primary" variant="displayMedium">
          Login
        </Text>
        <Text color="info" variant="bodyMedium">
          Login effortlessly with a quick OTP
        </Text>
      </View>

      <View style={{display: 'flex', gap: 20}}>
        <TextInputBox
          style={[globalStyles.fullWidth]}
          keyboardType="numeric"
          name="phoneNo"
          onInputChange={val => {
            setPhoneNo(() => val);
          }}
          value={phoneNo}
          label={'Phone Number'}
          error={!!error}
          errorMessage={error}
        />
        <Button
          style={[globalStyles.fullWidth]}
          text="Send Otp"
          onPress={handleOtpSendPress}
          loading={loading}
          disable={loading || !phoneNo}
        />
      </View>
    </Screen>
  );
}

export default Login;
