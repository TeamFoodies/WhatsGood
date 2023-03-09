import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const BackButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

export default function App() {
  const navigation = useNavigation();

  state = {
    reviews: [
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 1
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 2
      },
      {
        'name': 'Restaurant Name',
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 3
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 4
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 5
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 6
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 7
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 8
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 9
      },
      {
        'name': 'Restaurant Name', 
        'review': 'Review goes here stuff said about the restaurant. This food sucks i hate it here. Blah, blah, blah.', 
        'id': 10
      },
    ]
  }
  const itemList = this.state.reviews.map(review => <Text style={styles.item}>{review.name}   {review.review}</Text>)

  return (
    <View style={styles.container}>
      <BackButton onPress={() => this.navigation.navigate('viewRestaurant_screen')} title = "back"/>
      <Text style={styles.row}>Reviews</Text>
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <ScrollView>
          {itemList}
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderRadius: 10,
    padding: 20,
    borderColor: '#959889',
    borderWidth: 1,
    backgroundColor: '#C4DAC2',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#959889',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4DAC2',
    borderRadius: 30,
    padding: 20,
  },
  boxText: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  row: {
    padding: 10,
    fontSize: 30,
    textAlign: 'center',
    color: '2E7DB7',
  },
  buttonContainer: {
    backgroundColor: '#C4DAC2',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12, 
    marginLeft: -15,
    marginRight: 256,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 15,
    color: '2E7DB7',
  },
});
