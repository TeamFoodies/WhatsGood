import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

const BackButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.BackButton_container}>
    <Text style={styles.BackButton_text}>{title}Back</Text>
  </TouchableOpacity>
)

export default class Inputs extends Component {
  menuItems = [
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
  itemList = menuItems.map(menuItem => <Text style={styles.item}>{menuItem.item}   ${menuItem.price} {'\n'} 
                                              Description: {menuItem.description} </Text> )

  handleItem = (text) => {
    this.setState({ menu_item: text })
  }
  handlePrice = (text) => {
    this.setState({ price: text })
  }
  handleDescription = (text) => {
    this.setState({ description: text })
  }
  editItem = (item) => {
    alert('Item ' + item + ' updated')
  }
  
  render() {
    return (
        <ScrollView>
        <View style={styles.container}>
          <BackButton>
          </BackButton>
          
          <Text style={styles.row}>Menu Items</Text>
          <StatusBar style="auto" />
    
          <View style={styles.menuContainer}>
            <ScrollView>
            {itemList}
            </ScrollView>
          </View>
    
        </View>
        </ScrollView>
      );
  }
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
  editButton: {
    elevation: 8,
    backgroundColor: "#C4DAC2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  saveButton: {
    elevation: 8,
    backgroundColor: "#D6292C",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
