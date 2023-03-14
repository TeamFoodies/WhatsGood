import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const URL = 'http://172.104.196.152.4000/';

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.BackButton_container}>
      <Text style={styles.BackButton_text}>{title}</Text>
    </TouchableOpacity>
)

const DeleteBtn = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.DeleteBtn_container}>
        <Text style={styles.DeleteBtn_text}>Delete</Text>
    </TouchableOpacity>
)

const route = URL + "list";

export default function App() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <BackButton onPress={() => navigation.navigate('home_screen')} title = "Back"/>
    
          <Text style={styles.row}>Restaurants</Text>
          <StatusBar style="auto" />
    
          <View style={styles.menuContainer}>
            <FlatList 
                horizontal={true}
                
            
            />
          </View>
    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 40, 
      backgroundColor: '#AEBBC4',
    },
    menuContainer: {
      flex: 1,
      padding: 1, 
      backgroundColor: '#A0ADB2',
    },
    row: {
      padding: 15, 
      fontSize: 25,
      textAlign: 'center',
      color: '#2E7DB7',
    },
    item: {
      fontSize: 20,
      padding: 10,
      marginTop: 1,
      backgroundColor: '#D4E5F1',
    },
    DeleteBtn_container: {

    },
    DeleteBtn_text: {

    },
    BackButton_container: {
        backgroundColor: "#A6C6DC",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        marginLeft: -15,
        marginRight: 285,
        marginBottom: -10,
    },
    BackButton_text: {
        fontSize: 15,
        color: '#D6E3EC',
    },
  
  });