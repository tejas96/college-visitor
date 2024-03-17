import React, {useState} from 'react';
import {Button, Loader, NoData, PassCard, Screen} from '../../components';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import firestore from '@react-native-firebase/firestore';
import {IRegistrationForm} from '../../models/RegistrationFrom.interface';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '../../hooks';
import {FlatList, RefreshControl} from 'react-native';
import theme from '../../config/theme';
import {formatDate} from '../../utils/utilitiesFunc';

const {COLOR} = theme;
interface IProps {}

const VisitorGetPassHistory: React.FC<IProps> = () => {
  const {user} = useAuth();
  const [forms, setForms] = useState<Array<Partial<IRegistrationForm>>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
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
      .where('isApproved', '==', true)
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

  const handleDownloadGetPass = async (form: Partial<IRegistrationForm>) => {
    const date = new Date(form.createdAt);
    const createdDate = formatDate(date);
    date.setDate(date.getDate() + +form.expireDays);
    const expireDate = formatDate(date);

    const templatePayload: IRegistrationForm = {
      ...form,
      createdAt: createdDate,
      expireDays: expireDate,
    };

    const template = getTemplate(templatePayload);
    let options = {
      html: template,
      fileName: `${form.firstName}-${Date.now()}`,
      directory: 'Documents',
    };
    const file = await RNHTMLtoPDF.convert(options);
    setSnackBarMessage(() => `${file.filePath}`);
  };

  const onRefresh = () => {
    setIsRefreshing(() => true); // Start refreshing
    loadForms(true);
  };

  return (
    <Loader
      isLoading={loading}
      loadingMessage="Just a moment, we're gathering your get-pass history.">
      {forms.length ? (
        <Screen
          snackbarProps={{
            message: snackBarMessage,
            onDismiss: () => {
              setSnackBarMessage('');
            },
          }}
          disableScrollView
          viewProps={{style: {gap: 15}}}>
          <FlatList
            data={forms}
            renderItem={({item}) => {
              let date = new Date(+item.createdAt);
              let day = date.getDate().toString().padStart(2, '0');
              let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
              let year = date.getFullYear();
              return (
                <PassCard
                  key={item.id}
                  fullName={`${item.firstName} ${item.lastName}`}
                  onCreateDate={`${day}-${month}-${year}`}
                  onAction={() => handleDownloadGetPass(item)}
                  buttonName="Download"
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
      ) : (
        <NoData message="No Data">
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
};

export default VisitorGetPassHistory;

const getTemplate = ({
  firstName,
  lastName,
  createdAt,
  comment,
  contactNo,
  expireDays,
}: Partial<IRegistrationForm>): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Get Pass</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
          }
  
          .get-pass-container {
              width: 600px;
              height: 300px;
              margin: 20px auto;
              border: 1px solid #ddd;
              border-radius: 5px;
              padding: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
          }
  
          .get-pass-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
  
          .get-pass-header h1 {
              font-size: 24px;
              margin: 0;
          }
  
          .get-pass-details {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
          }
  
          .get-pass-detail {
              width: 45%;
              margin-bottom: 10px;
          }
  
          .get-pass-detail label {
              display: block;
              font-weight: bold;
              margin-bottom: 5px;
          }
  
          .get-pass-detail span {
              display: block;
          }
  
          .approved-status {
              font-weight: bold;
              text-align: center;
              padding: 5px 10px;
              border-radius: 5px;
              margin-top: 10px;
          }
  
          .approved {
              background-color: #4CAF50;
              color: white;
          }
  
          .not-approved {
              background-color: #F44336;
              color: white;
          }
      </style>
  </head>
  <body>
      <div class="get-pass-container">
          <div class="get-pass-header">
              <h1>Get Pass</h1>
              <img src="your_company_logo.png" alt="Company Logo" width="100" height="50">
          </div>
          <div class="get-pass-details">
              <div class="get-pass-detail">
                  <label for="full-name">Full Name:</label>
                  <span id="full-name">**${firstName} ${lastName}**</span>
              </div>
              <div class="get-pass-detail">
                  <label for="creation-date">Creation Date:</label>
                  <span id="creation-date">**${createdAt}**</span>
              </div>
              <div class="get-pass-detail">
                  <label for="mobile-no">Mobile No.:</label>
                  <span id="mobile-no">**${contactNo}**</span>
              </div>
              <div class="get-pass-detail">
                  <label for="comment">Comment:</label>
                  <span id="comment">**${comment}**</span>
              </div>
              <div class="get-pass-detail">
                  <label for="expire-date">Expire Date:</label>
                  <span id="expire-date">**${expireDays}**</span>
              </div>
          </div>
          <div class="approved-status approved">
              Approved
          </div>
      </div>
  </body>
  </html>
  `;
};
