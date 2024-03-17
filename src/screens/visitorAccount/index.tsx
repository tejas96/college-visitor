import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import globalStyles from '../../global/styles';
import {useAuth} from '../../hooks';
import {Button} from '../../components';

interface IProps {}
const VisitorAccount: React.FC<IProps> = () => {
  const {user, signOut} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(() => true);
    await signOut().finally(() => {
      setLoading(false);
    });
  };

  return (
    <View
      style={[
        globalStyles.flex1,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        {gap: 30},
      ]}>
      <Text variant="headlineLarge">{user?.phoneNumber}</Text>
      <Button
        text="Logout"
        onPress={handleLogout}
        loading={loading}
        disable={loading}
      />
    </View>
  );
};

export default VisitorAccount;
