import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, TextInput} from 'react-native';
import {Loader, PassCard, Screen} from '../../components';
import Text from '../../components/Text';
import {IRegistrationForm} from '../../models/RegistrationFrom.interface';
import theme from '../../config/theme';
import {useFocusEffect} from '@react-navigation/native';

const {COLOR} = theme;
interface IProps {}

const AdminDashboard: React.FC<IProps> = ({}) => {
  const [forms, setForms] = useState<Array<Partial<IRegistrationForm>>>([]);
  const [originalForms, setOriginalForms] = useState<
    Array<Partial<IRegistrationForm>>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hasRunEffect, setHasRunEffect] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useFocusEffect(() => {
    if (!hasRunEffect) {
      loadForms();
      setHasRunEffect(() => true);
    }
  });

  useEffect(() => {
    if (searchQuery === '') {
      setForms(originalForms);
    } else {
      const filteredForms = originalForms.filter(form =>
        `${form.firstName} ${form.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
      setForms(filteredForms);
    }
  }, [searchQuery, originalForms]);

  const loadForms = async (triggerByListPullDown?: boolean) => {
    if (!triggerByListPullDown) {
      setLoading(() => true);
    }
    const data = await firestore()
      .collection('Forms')
      .where('isApproved', '==', false)
      .get()
      .finally(() => {
        setLoading(() => false);
      });
    const formsData: Array<Partial<IRegistrationForm>> = [];
    data.docs.forEach(doc => {
      formsData.push({id: doc.id, ...doc.data()});
    });
    setForms(() => formsData);
    setOriginalForms(() => formsData);
    setIsRefreshing(false);
  };

  const handleOnApprove = (id: string) => {
    if (id) {
      firestore()
        .collection('Forms')
        .doc(id)
        .update({isApproved: true})
        .then(() => {
          const filterForms = originalForms.filter(item => item.id !== id);
          setForms(filterForms);
          setOriginalForms(filterForms);
        })
        .finally(() => {
          setLoading(() => false);
        });
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true); // Start refreshing
    loadForms(true);
  };

  return (
    <Loader isLoading={loading} loadingMessage="Loading approval list...">
      <Screen disableScrollView viewProps={{style: {display: 'flex', gap: 10}}}>
        <Text color="primary" variant="displayMedium">
          Approval List
        </Text>
        <Text color="info" variant="bodyMedium">
          Grant student entry pass for college.
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: COLOR.border,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
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
                onAction={() => {
                  handleOnApprove(item.id);
                }}
                buttonName="Approve"
                comment={item.comment}
                expireDays={item.expireDays}
                contactNo={item.contactNo}
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
    </Loader>
  );
};

export default AdminDashboard;
