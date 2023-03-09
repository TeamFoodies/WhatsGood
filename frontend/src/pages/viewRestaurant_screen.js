import { useState } from 'react';
import React from 'react';
import { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const URL = 'http://172.104.196.152.4000/';

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
                <NavigationButton title="Home" onPress={() => this.props.navigation.navigate('home_screen')}/>
                <NavigationButton title="Edit Restaurant" onPress={() => this.props.navigation.navigate('editRestaurant_screen')}/>
                <NavigationButton title="Add Review" onPress={() => this.props.navigation.navigate('addReview_screen')} />
                <NavigationButton title="View Reviews" onPress={() => this.props.navigation.navigate('viewReview_screen')} />
                <NavigationButton title="Edit Menu" onPress={() => this.props.navigation.navigate('editMenuPage')} />
                <NavigationButton title="View Menu" onPress={() => this.props.navigation.navigate('viewMenu_screen')} />
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
Rectangle_layout:{
    alignItems: 'center',
},
buttonRectangle: {
    width: 325,
    height: 525,
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
    marginBottom: 15,
    marginTop: 25,
},
Button_Text: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
},
});
