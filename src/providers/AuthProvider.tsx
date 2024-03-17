import React, {createContext, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Loader} from '../components';

type AuthUser = Partial<FirebaseAuthTypes.User> & {
  role?: string;
};

interface AuthContextInterface {
  user: AuthUser | null;
  signInWithPhoneNumber: (
    phoneNumber: string,
    forceResend?: boolean,
  ) => Promise<void>;
  confirmOtp: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  adminSignOut: () => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
}

interface IProps {
  children: React.ReactNode;
}

//@ts-ignore
export const AuthContext = createContext<AuthContextInterface>();

const AuthProvider: React.FC<IProps> = ({children}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialize, setInitialize] = useState<boolean>(false);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  useEffect(() => {
    return auth().onAuthStateChanged(handleAuthStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAuthStateChange(
    authUser: FirebaseAuthTypes.User | null,
  ): Promise<void> {
    setUser(authUser);
    if (initialize) {
      setInitialize(false);
    }
  }

  async function signInWithPhoneNumber(
    phoneNumber: string,
    forceResend?: boolean,
  ) {
    const confirmation = await auth().signInWithPhoneNumber(
      `+91${phoneNumber}`,
      forceResend,
    );
    setConfirm(() => confirmation);
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    if (email === 'admin' && password === 'admin') {
      const adminUser: AuthUser = {
        role: 'Admin',
        email,
      };
      setUser(adminUser);
    }
    throw new Error('Wrong user');
  }

  async function signOut() {
    try {
      await auth().signOut();
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async function adminSignOut() {
    setUser(null);
  }

  async function confirmOtp(otp: string) {
    try {
      if (!confirm) throw Error('No confirmation result.');
      await confirm.confirm(otp);
    } catch (error: any) {
      console.error(`Invalid code. ${error.message}`);
      throw error;
    }
  }

  const value = {
    user,
    signInWithPhoneNumber,
    signOut,
    confirmOtp,
    signInWithEmailAndPassword,
    adminSignOut,
  };
  return (
    <Loader isLoading={initialize}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </Loader>
  );
};

export default AuthProvider;
