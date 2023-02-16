import { useState } from 'react';
import React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class App extends Component{
    render(){
    return (
        <View style={styles.app_container}>
            <View style={styles.restaurantName_layout}>
                <Text style={styles.restaurantName_text}>Restaurant Name</Text>
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
  },
  restaurantName_text:{
    fontSize: 35,
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'center',
  }
});
