import React, {useState} from 'react';
import {View} from 'react-native';
import Text from '../../components/Text';
import globalStyles from '../../global/styles';
import {useAuth} from '../../hooks';
import {Button} from '../../components';

interface IProps {}
const AdminAccount: React.FC<IProps> = () => {
  const {user, adminSignOut} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(() => true);
    await adminSignOut().finally(() => {
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
      <Text variant="headlineLarge">{user?.email}</Text>
      <Button
        text="Logout"
        onPress={handleLogout}
        loading={loading}
        disable={loading}
      />
    </View>
  );
};

export default AdminAccount;
