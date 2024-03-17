import React, {useState} from 'react';
import styles from './styles';
import theme from '../../config/theme';
import {StatusBar, View} from 'react-native';
import {Button, Screen} from '../../components';
import Text from '../../components/Text';
import globalStyles from '../../global/styles';
import {useAuth} from '../../hooks';
import OtpInputs from 'react-native-otp-inputs';
import {HelperText} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LoginStackParamList} from '../../navigation/LoginNavigation';

const {COLOR} = theme;

const Otp: React.FC<{}> = () => {
  const route = useRoute<RouteProp<LoginStackParamList, 'Otp'>>();
  const {confirmOtp, signInWithPhoneNumber} = useAuth();
  const [otpNumber, setOtpNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingOtpSend, setLoadingOtpSend] = useState<boolean>(false);

  const handleOtpSendPress = async () => {
    setLoadingOtpSend(() => true);
    await signInWithPhoneNumber(route.params.phone);
    setLoadingOtpSend(() => false);
  };

  const submitOtp = async () => {
    setLoading(() => true);
    confirmOtp(otpNumber)
      .then(() => {
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(() => false);
      });
  };

  return (
    <Screen viewProps={{style: styles.container}} disableScrollView>
      <StatusBar backgroundColor={COLOR.background} barStyle="dark-content" />
      <View style={[globalStyles.fullWidth]}>
        <Text color="primary" variant="displayMedium">
          OTP
        </Text>
        <Text color="info" variant="bodyMedium">
          Enter 6 digit otp sent your phone.
        </Text>
        {errorMessage ? (
          <HelperText style={{alignSelf: 'flex-start'}} type="error">
            {errorMessage}
          </HelperText>
        ) : null}
      </View>
      <OtpInputs
        handleChange={code => setOtpNumber(() => `${code}`)}
        numberOfInputs={6}
        autofillFromClipboard
        inputStyles={{
          borderBottomWidth: 1,
          color: 'black',
          borderColor: 'grey',
          padding: 10,
          textAlign: 'center',
          marginHorizontal: 2,
        }}
      />
      <View style={[globalStyles.fullWidth]}>
        <Button
          style={[globalStyles.fullWidth, {marginTop: 20}]}
          text="Submit"
          onPress={submitOtp}
          loading={loading}
          disable={loading || loadingOtpSend}
        />
      </View>
    </Screen>
  );
};

export default Otp;
