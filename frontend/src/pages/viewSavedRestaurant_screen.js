import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const navigation = useNavigation();

  const [ favorite, setFavorite ] = useState([]);
  const [ restaurant, setRestaurant ] = useState(null);

  useEffect(() => {
    const route = global.url + 'user/id/' + global.username;
    fetch(route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            setFavorite(response.favorites);
            break;
          default:
            console.log(response);
            break;
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  
  const findRestaurant = (item) => {
    useEffect(() => {
      const route = global.url + 'restaurant/id/' + item;
      fetch(route, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => {
          switch (response.response) {
            case 200:
              setRestaurant(response.restaurant);
              break;
            default:
              console.log(response);
              break;
          }
        })
        .catch(error => {
          console.log(error);
        })
    }, []);
  }

  const renderSaved = (item) => {
    {findRestaurant(item)}
    return(
      <View style={styles.item}>
        <Text style={styles.item_header}>{restaurant.name}</Text>
        {restaurant.address === undefined ? null : <Text style={styles.item_address}>{restaurant.address}</Text>}
      </View>
    )
  }

  const renderAll = () => {
    if(favorite === undefined) return null;
    return(
      <View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.touchable_left} onPress={() => navigation.navigate('homeViewRestaurant_screen')}>
              <View style={styles.back_button}>
                <Entypo
                  style={styles.back_button_content}
                  name={'chevron-left'}
                  size={ICON_SIZE}
                ></Entypo>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.header_title}>View Saved Restaurants</Text>
          </View>
        {favorite.map((item) => {renderSaved(findRestaurant(item))})}
      </View>
    )
  }

  return (
     <ScrollView>
      {renderAll()}
     </ScrollView>
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
    header_title: {
      fontSize: 45,
      fontWeight: 'bold',
      color: '#ffffff'
    },
    row: {
      padding: 15, 
      fontSize: 25,
      textAlign: 'center',
      color: '#2E7DB7',
    },
    touchable_left: {
      marginRight: 'auto',
    },
    item: {
      fontSize: 20,
      padding: 10,
      marginTop: 1,
      backgroundColor: '#D4E5F1',
    },
    back_button: {
      flex: 0,
      width: 'auto',
      backgroundColor: '#d4d4d4',
      padding: 20,
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    back_button_content: {
      position: 'absolute',
      marginHorizontal: 'auto',
      width: 30,
      height: 30,
      color: '#000000'
    },
  
  });