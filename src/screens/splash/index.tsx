import React, {useEffect} from 'react';
import {Loader} from '../../components';
import {useAuth} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../navigation';

interface IProps {}

const Splash: React.FC<IProps> = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        setTimeout(() => {
          navigation.replace('AdminBottomTab', {screen: 'AdminHome'});
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.replace('VisitorBottomTabs', {
            screen: 'VisitorHome',
            params: {
              screen: 'VisitorHistory',
            },
          });
        }, 1000);
      }
    }
  }, [user, navigation]);

  return <Loader isLoading={true} />;
};

export default Splash;
