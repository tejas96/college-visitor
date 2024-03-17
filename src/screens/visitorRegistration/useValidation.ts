import * as yup from 'yup';
import {useState} from 'react';
import {IRegistrationForm} from '../../models/RegistrationFrom.interface';

type TDefaultErrors = IRegistrationForm & {
  expireDays: string;
};
const defaultErrors: Partial<TDefaultErrors> = {};

const useValidation = () => {
  const [errors, setErrors] = useState<Partial<TDefaultErrors>>(defaultErrors);
  const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    expireDays: yup
      .number()
      .required('Expire days required')
      .min(1, 'Minimum 1 day'),
    contactNo: yup
      .string()
      .matches(/^(\+91)?[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    comment: yup.string(),
    isApproved: yup.boolean(),
  });

  const validate = async (
    registrationForm: IRegistrationForm,
    abortEarly: boolean,
  ): Promise<boolean> => {
    try {
      await schema.validate(registrationForm, {abortEarly});
      setErrors(() => defaultErrors);
      return true;
    } catch (err: any) {
      const errorObj: any = {};
      err.inner.forEach((item: any) => {
        errorObj[item.path] = item.message;
      });
      setErrors({
        ...defaultErrors,
        ...errorObj,
      });
      return false;
    }
  };

  return {
    validate,
    errors,
  };
};

export default useValidation;
