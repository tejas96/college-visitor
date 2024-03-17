import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {Button} from '.';

interface IProps {
  fullName: string;
  onCreateDate: string;
  onAction: () => void;
  buttonName: string;
  comment?: string;
  status?: boolean | undefined;
  expireDays: string;
  contactNo: string;
}
const PassCard: React.FC<IProps> = ({
  fullName,
  onAction,
  buttonName,
  onCreateDate,
  comment,
  status,
  expireDays,
  contactNo,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{fullName}</Text>
      <Text style={styles.text}>{`Created: ${onCreateDate}`}</Text>
      <Text style={styles.text}>{`Valid Days: ${expireDays}`}</Text>
      {status !== undefined ? (
        <Text
          style={[styles.text, {color: status ? 'green' : 'red'}]}>{`Status: ${
          status ? 'Approved' : 'Pending'
        }`}</Text>
      ) : null}
      {comment !== undefined ? (
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.text}>{`Comment: ${comment || '-'}`}</Text>
      ) : null}
      {contactNo !== undefined ? (
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.text}>{`phone: ${contactNo || '-'}`}</Text>
      ) : null}
      {buttonName ? (
        <Button
          variant="text"
          text={buttonName}
          onPress={onAction}
          style={styles.button}
        />
      ) : null}
    </View>
  );
};

export default PassCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 5, // Creates a subtle shadow
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  },
});
