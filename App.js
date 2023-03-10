import { StatusBar } from 'expo-status-bar';
//import Constants from 'expo-constants';
import { StyleSheet, Text, Button, View, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import MyModal from './components/MyModal';

import theme from './styles/theme.style.js';
import {API_KEY} from '@env';

//console.log('API KEY from app.json: ', Constants.expoConfig.extra.API_KEY);

console.log('API KEY from .env: ', API_KEY);


//Displays error messages:
  const statusCodes = (status, errDetails) => {
    let msg;
    switch(status) {
      case 401:
        msg = '401 Unauthorized';
        break;
      case 404:
        msg = 'HTTP 404 Not Found';
        break;
      case 500:
        msg = '500 Internal Server Error';
        break;
      default:
        msg = "Unknown error";
    }
    console.log('Status code: ', msg);
  };


export default function App() {

  const [fontsLoaded] = useFonts({
    'Oswald': require('./assets/fonts/Oswald-Regular.ttf'),
    'Roboto': require('./assets/fonts/RobotoSlab-Regular.ttf'),
  });

  const [fetchedData, setFetchedData] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  //General function for API-requests:
  const apiRequest = async () => {
    try {
      console.log('API KEY: ', REACT_APP_API_KEY);
      const request = `https://api.rawg.io/api/games?key=acaf86192e384591a1d8e7a349cc18ad&platforms=79`; //${process.env.REACT_APP_API_KEY}
      const res = await fetch(request);
      const data = await res.json();
      if (!res.ok) {
        statusCodes(res.status, data.status_message);
        return;
      }
	console.log(data);
      //determineDataDestination(endpoint, data);
      //callbackFunction(data);
    } catch (err) {
      //handleErr(err);
	console.log(err);
    }
  };

  const displayModal = (id) => {
    console.log(`Time to display modal with id ${id}!`);
    id === -1 ? setModalIsVisible(false) : setModalIsVisible(true);
  }

  return (
    <>
      <StatusBar style="invert" />
      <View style={styles.container}>
        <NavBar />
        {/*
          <FlatList>
          <Text>TODO: add nav bar, titlescontainer</Text>
          </FlatList>
        */}
        <Button title='Fetch Data' onPress={apiRequest}></Button>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {/*<Text style={styles.testTxt}>Yoyo</Text>*/}
          <Card id='0' displayModal={displayModal}></Card>
          <Card id='1' displayModal={displayModal}></Card>
          <Card id='2' displayModal={displayModal}></Card>
          <Card id='3' displayModal={displayModal}></Card>
          <Card id='4' displayModal={displayModal}></Card>
        </ScrollView>
        <MyModal visible={modalIsVisible} closeModal={displayModal} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    backgroundColor: 'green',
    width: '100%',
    /*
    minWidth: '100%',
    */
  },
  testTxt: {
    fontFamily: 'Oswald',
    fontSize: 40
  }

});
