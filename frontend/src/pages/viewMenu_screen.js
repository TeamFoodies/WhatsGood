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
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 2,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },
    {
      id: 3,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 4,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },
    {
      id: 5,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 6,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },
    {
      id: 7,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 8,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },
    {
      id: 9,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 10,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },
    {
      id: 11,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
      review: 'Fried to perfection, well seasoned and very juicy.'
    },
    {
      id: 12,
      item: 'Stinky Tofu', 
      price: 6,
      description: 'Fermented tofu that is deep fried',
      review: 'Potent smell but the taste is worth it.'
    },

  ]

  const itemList = menuItems.map(menuItem => <Text style={styles.item}>{menuItem.item}   ${menuItem.price} {'\n'} 
                                              Description: {menuItem.description} </Text> )

{/* 
  itemSeparator = () => {
    return <Text style={styles.separator} />
  }
*/}
  return (
    <View style={styles.container}>

      <Text style={styles.row}>View Menu</Text>
      <StatusBar style="auto" />

      <View style={styles.menuContainer}>
      <ScrollView>
        {itemList}
        {/* 
        itemSeparatorComponent = {itemSeparator}
        */}
      </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30, 
    backgroundColor: '#AAACAC',
  },
  menuContainer: {
    flex: 1,
    padding: 1, 
    backgroundColor: '#B5BBBB',
  },
  row: {
    padding: 5, 
    fontSize: 50,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.lineWidth,
  },
  item: {
    fontSize: 20,
    padding: 12,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },

});
