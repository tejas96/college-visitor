import React, {useState} from 'react';
import {Button, Loader, NoData, PassCard, Screen} from '../../components';
import firestore from '@react-native-firebase/firestore';
import {IRegistrationForm} from '../../models/RegistrationFrom.interface';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../../hooks';
import {FlatList, RefreshControl} from 'react-native';
import theme from '../../config/theme';

const {COLOR} = theme;

function VisitorGetPassRequest() {
  const {user} = useAuth();
  const [forms, setForms] = useState<Array<Partial<IRegistrationForm>>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hasRunEffect, setHasRunEffect] = useState<boolean>(false);
  useFocusEffect(() => {
    if (!hasRunEffect && user?.uid) {
      loadForms();
      setHasRunEffect(() => true);
    }
  });

  const loadForms = async (triggerByListPullDown?: boolean) => {
    if (!triggerByListPullDown) {
      setLoading(() => true);
    }
    const data = await firestore()
      .collection('Forms')
      .where('contactNo', '==', user?.phoneNumber)
      .where('isApproved', '==', false)
      .get();
    const formsData: Array<Partial<IRegistrationForm>> = [];
    data.docs.forEach(doc => {
      formsData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setForms(() => formsData);
    setLoading(() => false);
    setIsRefreshing(false);
  };

  const onRefresh = () => {
    setIsRefreshing(true); // Start refreshing
    loadForms(true);
  };

  return (
    <Loader
      isLoading={loading}
      loadingMessage="Just a moment, we're gathering your get-pass history.">
      {forms.length ? (
        <Screen disableScrollView viewProps={{style: {gap: 15}}}>
          <FlatList
            data={forms}
            renderItem={({item}) => {
              let dateObject = new Date(+item.createdAt);
              let day = dateObject.getUTCDate().toString().padStart(2, '0');
              let month = (dateObject.getUTCMonth() + 1)
                .toString()
                .padStart(2, '0'); // Months are zero-based, so add 1
              let year = dateObject.getUTCFullYear();
              return (
                <PassCard
                  key={item.id}
                  fullName={`${item.firstName} ${item.lastName}`}
                  onCreateDate={`${day}-${month}-${year}`}
                  onAction={() => {}}
                  buttonName=""
                  comment={item.comment}
                  expireDays={item.expireDays}
                />
              );
            }}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[COLOR.primary]} // Color of the refresh indicator
                tintColor={COLOR.primary} // Color of the refresh indicator on iOS
                title="Fetching get pass" // Text shown while refreshing
                titleColor={COLOR.primary} // Color of the text shown while refreshing
              />
            }
          />
        </Screen>
      ) : (
        <NoData message="No Request">
          <Button
            text="Refresh"
            variant="text"
            onPress={() => {
              loadForms();
            }}
          />
        </NoData>
      )}
    </Loader>
  );
}

export default VisitorGetPassRequest;
