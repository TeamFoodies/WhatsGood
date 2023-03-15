import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Entypo} from "@expo/vector-icons";

export default function App() {
  const navigation = useNavigation();

  const [ favorite, setFavorite ] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

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
            setFavorite(response.user.favorites);
            setRestaurants([]);
            findRestaurant(response.user.favorites)
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
  
  const findRestaurant = (favorites) => {
    if (favorites === null) return;
    let newRestaurants = [];
    favorites.forEach((item) => {
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
              newRestaurants = [...newRestaurants, response.restaurant];
              break;
            default:
              console.log(response);
              break;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setRestaurants(newRestaurants));
    })
  }

  const renderRestaurant = (item) => {
    if (item === null) return null;
    return (<TouchableOpacity style={styles.item} onPress={() => navigation.navigate('viewRestaurant2_screen', {restaurantId: item.id, backScreen: 'viewSavedRestaurant_screen'})}>
      <Text style={styles.item_header}>{item.name}</Text>
      {item.address === undefined ? null : <Text style={styles.item_address}>{item.address}</Text>}
    </TouchableOpacity>)
  }

  const renderAll = () => {
    if(favorite === undefined) return null;
    return(
      <View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.touchable_left} onPress={() => navigation.navigate('home_screen')}>
              <View style={styles.back_button}>
                <Entypo
                  style={styles.back_button_content}
                  name={'chevron-left'}
                  size={28}
                ></Entypo>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.header_title}>View Saved Restaurants</Text>
          </View>
        {restaurants.map((item) => renderRestaurant(item))}
      </View>
    )
  }

  return (
     <ScrollView style={styles.container} bounces={false}>
      {renderAll()}
     </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#AEBBC4',
    },
    menuContainer: {
      flex: 1,
      padding: 5,
      backgroundColor: '#A0ADB2',
    },
    header_title: {
      fontSize: 45,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    row: {
      paddingTop: 35,
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
    item_header: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    item_address: {
      fontSize: 18
    },
  });