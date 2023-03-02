import { useState } from 'react';
import { Component } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Box = ({ children }) => (
    <View style={styles.box}>
        {children}
    </View>
)

Box.propTypes = {
    children: PropTypes.node.isRequired,
}

const AddButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.addButton_container}>
      <Text style={styles.addButton_Text}>{title}Add</Text>
    </TouchableOpacity>
)


export default class App extends Component{
    constructor(){
        super();
        this.state={
          charCount : '0'
        }
      }
    
    GetCharCount = (body) =>{
        var bodyLength = body.length.toString();
        this.setState({charCount : bodyLength});
    }

    render(){
    return (
        <View style={styles.app_container}>
        <Box>
             <Text style={styles.boxText}> What's Good?</Text>
        </Box>
 
        <ScrollView>
            <View style={styles.center_container}>
                <Text style={{fontSize:35}}> Add A Review</Text>
            </View>
 
            <View style={styles.entries_layout}>
                <Text style={styles.entries_titles}> Rating: </Text>
                <TextInput style={styles.entryInput} placeholder="0.0 to 5.0 ..." keyboardType='numeric'/>
            </View>
 
            <View style={styles.entries_layout}>
                <Text style={styles.entries_titles}>     Title: </Text>
                <TextInput style={styles.entryInput} placeholder="Title of review..." />
            </View>

            <Text style={styles.characterCount}>max: { this.state.charCount}/200 </Text>

            <View style={styles.bodyEntry_layout}>
                <Text style={styles.entries_titles}>   Body: </Text>
                <TextInput style={styles.multilineEntryInput}
                    placeholder="Write review..."
                    onChangeText={ body => this.GetCharCount(body) }
                    editable
                    multiline
                    maxLength={200}
                />
            </View>

        </ScrollView>

        <AddButton onPress={() => this.props.navigation.navigate('viewRestaurant_screen')}>
        </AddButton>
 
     </View>
    );
  }
}

  const styles = StyleSheet.create({
    app_container: {
        flex: 1,
        backgroundColor: '#959889',
      },
      box: {
        backgroundColor: '#C4DAC2',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#C4DAC2',
        padding: 10,
        margin: 0,
        marginBottom: 0,
      },
      boxText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '50',
      },
      center_container: {
        alignItems: 'center',
        marginTop: 20,
      },
      entries_layout: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 25,
      },
      entries_titles:{
        fontSize: 24,
        marginTop: 12,
      },
      entryInput:{
        borderWidth: 0,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '65%',
        height: '70%',
        marginTop: 10,
        marginLeft: 10,
        padding: 8,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
      },
      multilineEntryInput:{
        borderWidth: 0,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '65%',
        height: '70%',
        marginTop: 10,
        marginLeft: 10,
        padding: 8,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
        paddingTop: 10,
      },
      bodyEntry_layout: {
        flexDirection: 'row',
        marginLeft: 20,
      },
      characterCount:{
        marginLeft: 270,
        marginTop: 25,
      },
      addButton_container: {
        elevation: 8,
        backgroundColor: "#C4DAC2",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
      },
      addButton_Text: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
  });