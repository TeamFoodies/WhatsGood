import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const URL = 'http://172.104.196.152.4000/';

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.BackButton_container}>
      <Text style={styles.BackButton_text}>{title}</Text>
    </TouchableOpacity>
)

export default function App() {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
  ]

  const itemList = menuItems.map(menuItem => <Text style={styles.item}>{menuItem.item}   ${menuItem.price} {'\n'} 
                                              Description: {menuItem.description} </Text> )

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.navigate('viewRestaurant_screen')} title = "Back"/>
      
      <Text style={styles.row}>Menu Items</Text>
      <StatusBar style="auto" />

      <View style={styles.menuContainer}>
        <ScrollView>
        {itemList}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50, 
    backgroundColor: '#79878D',
  },
  menuContainer: {
    flex: 1,
    padding: 1, 
    backgroundColor: '#A0ADB2',
  },
  row: {
    padding: 15, 
    fontSize: 35,
    textAlign: 'center',
    color: '#2E7DB7',
  },
  item: {
    fontSize: 20,
    padding: 10,
    marginTop: 1,
    backgroundColor: '#D4E5F1',
  },
  BackButton_container: {
    backgroundColor: "#A6C6DC",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginLeft: -15,
    marginRight: 265,
    marginBottom: -10,
},
BackButton_text: {
    fontSize: 15,
    color: '#D6E3EC',
},

});
