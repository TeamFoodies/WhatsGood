import { useState } from 'react';
import React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const NavigationButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.Button_container}>
      <Text style={styles.Button_Text}>{title}</Text>
    </TouchableOpacity>
)

export default class App extends Component{
    render(){
    return (
        <View style={styles.app_container}>

            <View style={styles.restaurantName_layout}>
                <Text style={styles.restaurantName_text}>Restaurant Name</Text>
            </View>

            <View style={styles.Rectangle_layout}>
                <View style={styles.buttonRectangle}>
                    <NavigationButton title="Home" onPress={() => {}} />
                    <NavigationButton title="Add Review" onPress={() => {}} />
                    <NavigationButton title="View Reviews" onPress={() => {}} />
                    <NavigationButton title="Edit Menu" onPress={() => {}} />
                    <NavigationButton title="View Menu" onPress={() => {}} />
                </View>
            </View>
           
        </View>
    );
  }
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#959889',
  },
  restaurantName_layout: {
    marginTop: 65,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  restaurantName_text:{
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  titleRectangle: {
    width: 325,
    height: 475,
    borderRadius: 60,
    backgroundColor: '#C4DAC2',
  },
  Rectangle_layout:{
    alignItems: 'center',
  },
  buttonRectangle: {
    width: 325,
    height: 475,
    borderRadius: 60,
    backgroundColor: '#C4DAC2',
  },
  Button_container: {
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    marginTop: 25,
  },
  Button_Text: {
    fontSize: 24,
    color: 'black',
    alignSelf: "center",
  },
});
