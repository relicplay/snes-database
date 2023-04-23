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

//console.log('API KEY from .env: ', API_KEY);


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

  const [snesTitles, setSnesTitles] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    console.log('snes titles data: ', snesTitles);
  }, [snesTitles]);

  //General function for API-requests:
  const apiRequest = async (callbackFunction=setSnesTitles) => {
    try {
      console.log('API KEY: ', API_KEY);
      const request = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&platforms=79`;
      const res = await fetch(request);
      const data = await res.json();
      if (!res.ok) {
        statusCodes(res.status, data.status_message);
        return;
      }
      callbackFunction(data.results);
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
        <Button title='Fetch Data' onPress={() => {apiRequest();}}></Button>
        {
          <FlatList
          contentContainerStyle={styles.cardContainerFlat}
          data={snesTitles}
          renderItem={(item) => {
            //console.log(item);
            return (
              <Card id={item.index} title={item.item.name} displayModal={displayModal}></Card>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          numColumns={2}
          alwaysBounceVertical={false} />
          }
        {/*
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <Text style={styles.testTxt}>Yoyo</Text>
          <Card id='0' displayModal={displayModal}></Card>
          <Card id='1' displayModal={displayModal}></Card>
          <Card id='2' displayModal={displayModal}></Card>
          <Card id='3' displayModal={displayModal}></Card>
          <Card id='4' displayModal={displayModal}></Card>
        </ScrollView>
        */}
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
  cardContainerFlat: {
    flexDirection: 'column',
    backgroundColor: 'green',
    width: '100%',
  },
  testTxt: {
    fontFamily: 'Oswald',
    fontSize: 40
  }

});
