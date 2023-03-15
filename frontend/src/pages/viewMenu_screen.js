import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App({route, navigation}) {
  //const navigation = useNavigation();

  const { restaurantId } = route.params;
  const [ data, setData ] = useState(null);

  useEffect(() => {
    const route = global.url + 'restaurant/id/' + restaurantId;
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
            setData(response.restaurant);
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

  const renderMenuItem = (item) => {
    return(
      <View style={styles.menuContainer} key={item.id}>
        <View style={styles.item_top_container}>
          <Text style={styles.item_name_text}>{item.name}</Text>
          <Text style={styles.item_price_text}>${item.price}</Text>
        </View>
        <View>
          <Text style={styles.item_description_text}>{item.description}</Text>
        </View>
      </View>
    )
  }
  const ICON_SIZE = 28;

  const renderMenu = () => {
    if (data === null) return null;
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
            <Text style={styles.header_title}>View Menu</Text>
          </View>
        {data.menu === undefined ? null : <View style={styles.row}>{data.menu.map((item) => renderMenuItem(item))}</View>}  
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      {renderMenu()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50, 
    backgroundColor: '#e7e7e7',
  },
  header_title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 1, 
    borderRadius: 3,
    backgroundColor: '#D4E5F1',
  },
  row: {
    padding: 15, 
    fontSize: 35,
    textAlign: 'center',
    color: '#2E7DB7',
  },
  touchable_left: {
    marginRight: 'auto',
  },
  item_top_container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  item_name_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item_price_text: {
    fontSize: 20,
    marginLeft: 'auto',
  },
  item_description_text: {
    fontSize: 15,
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
