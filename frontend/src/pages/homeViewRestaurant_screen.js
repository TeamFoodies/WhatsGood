import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.BackButton_container}>
      <Text style={styles.BackButton_text}>{title}</Text>
    </TouchableOpacity>
)

export default function App() {
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      const route = global.url + 'restaurant/list';
      fetch(route, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(response => {
          switch (response.response) {
            case 200:
              setList(response.restaurants);
              break;
            case 500:
              setErrorMsg(response.error);
              break;
            default:
              setErrorMsg('Unknown error occurred.');
              break;
          }
        })
        .catch(error => {
          console.log(error);
          setErrorMsg('Could not connect to backend server.');
        })
    }, []);

    const renderItem = (item) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('viewRestaurant2_screen', { restaurantId: item.id, backScreen: 'homeViewRestaurant_screen' })}>
          <View style={styles.item}>
            <Text style={styles.item_header}>{item.name}</Text>
            {item.address === undefined ? null : <Text style={styles.item_address}>{item.address}</Text>}
          </View>
        </TouchableOpacity>
      )
    }

    return (
        <View style={styles.container}>
          <BackButton onPress={() => navigation.navigate('home_screen')} title = "Back"/>
    
          <Text style={styles.row}>Restaurants</Text>
          <StatusBar style="auto" />
    
          <View style={styles.menuContainer}>
            <FlatList 
                data={list}
                renderItem={({ item }) =>
                    <View style={styles.menuContainer}>
                      {renderItem(item)}
                    </View>}
                keyExtractor={item => item.id}
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
      borderRadius: 5, 
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
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: '#D4E5F1',
    },
    item_header: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    item_address: {
      fontSize: 18
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