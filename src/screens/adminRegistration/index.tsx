import React, {useState} from 'react';
import {Button, Screen, TextInputBox} from '../../components';
import styles from './styles';
import Text from '../../components/Text';
import useValidation from './useValidation';
import firestore from '@react-native-firebase/firestore';
import {IRegistrationForm} from '../../models/RegistrationFrom.interface';

interface IProps {}

const AdminRegistration: React.FC<IProps> = () => {
  const [formState, setFormState] = useState<IRegistrationForm>({
    firstName: '',
    lastName: '',
    contactNo: '',
    expireDays: 0,
    comment: '',
    isApproved: false,
  });
  const {validate, errors} = useValidation();
  const [loader, setLoader] = useState<boolean>(false);
  const [snackBarMsg, setSnackbarMsg] = useState('');

  const handleFormOnchange = (value: string, name: string) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const isValidInputs = await validate(formState, false);
    if (isValidInputs) {
      const payload: IRegistrationForm = {
        ...formState,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isRequestedByVisitor: false,
        isApproved: true,
        contactNo: `+91${formState.contactNo}`,
      };
      const usersCollection = firestore().collection('Forms');
      setLoader(() => true);
      usersCollection
        .add(payload)
        .then(() => {
          setSnackbarMsg('Successfully registered');
        })
        .finally(() => {
          setLoader(() => false);
        });
    }
  };

  return (
    <Screen
      snackbarProps={{
        message: snackBarMsg,
        onDismiss: () => setSnackbarMsg(''),
      }}>
      <Text variant="displayMedium" color="primary">
        Visitor Registration
      </Text>
      <TextInputBox
        style={[styles.marginV]}
        label={'First Name'}
        name={'firstName'}
        value={formState.firstName}
        onInputChange={handleFormOnchange}
        error={!!errors.firstName}
        errorMessage={errors.firstName}
      />

      <TextInputBox
        style={[styles.marginV]}
        label={'Last Name'}
        name={'lastName'}
        value={formState.lastName}
        onInputChange={handleFormOnchange}
        error={!!errors.lastName}
        errorMessage={errors.lastName}
      />
      <TextInputBox
        style={[styles.marginV]}
        label={'Contact No'}
        name={'contactNo'}
        value={formState.contactNo}
        onInputChange={handleFormOnchange}
        keyboardType="numeric"
        error={!!errors.contactNo}
        errorMessage={errors.contactNo}
      />
      <TextInputBox
        style={[styles.marginV]}
        label={'Expire Days'}
        name={'expireDays'}
        value={String(formState.expireDays)}
        onInputChange={handleFormOnchange}
        keyboardType="numeric"
        error={!!errors.expireDays}
        errorMessage={errors.expireDays}
      />
      <TextInputBox
        style={[styles.marginV]}
        label={'Comment'}
        name={'comment'}
        value={formState.comment}
        onInputChange={handleFormOnchange}
        multiline
        numberOfLines={5}
        error={!!errors.comment}
        errorMessage={errors.comment}
      />
      <Button
        loading={loader}
        disable={loader}
        style={styles.submitBtn}
        text="Submit"
        onPress={handleFormSubmit}
      />
    </Screen>
  );
};

export default AdminRegistration;
