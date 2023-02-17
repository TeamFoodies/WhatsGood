import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const menuItems = [
    {
      id: 1,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 2,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
    {
      id: 3,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 4,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
    {
      id: 5,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 6,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
    {
      id: 7,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 8,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
    {
      id: 9,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 10,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
    {
      id: 11,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 12,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
    },
  ]

  const itemList = menuItems.map(menuItem => <Text style={styles.item}>{menuItem.item}   ${menuItem.price} {'\n'} 
                                              Description: {menuItem.description} </Text> )

  return (
    <View style={styles.container}>

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

});
