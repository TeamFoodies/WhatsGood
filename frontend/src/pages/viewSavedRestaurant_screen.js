import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.BackButton_container}>
      <Text style={styles.BackButton_text}>{title}Back</Text>
    </TouchableOpacity>
)

export default function App() {
    const savedRestaurants = [
      {
        id: 1,
        name: 'Olive Garden', 
        distance: 8.00,
        address: '1538 S. Altar Drive, 97021, CA',
      },
      {
        id: 2,
        name: 'Quickly', 
        distance: 16.30,
        address: '1495 Dumpling Street, 91250, CA',
      },
      {
        id: 3,
        name: 'Starbucks', 
        distance: 8.00,
        address: '1152 E. Gooby Blvd, 95621, CA',
      },
      {
        id: 4,
        name: 'In-N-Out', 
        distance: 2.13,
        address: '1796 Crypto Street, 91250, CA',
      },
      {
        id: 5,
        name: 'Oyster Depot', 
        distance: 3.50,
        address: '1566 Urchin Drive, 90236, CA',
      },
      {
        id: 6,
        name: 'Taco Bell', 
        distance: 11.32,
        address: '1222 Fleming Street, 91400, CA',
      },

    ]
  
    const itemList = savedRestaurants.map(savedRestaurant => <Text style={styles.item}>{savedRestaurant.name}    {savedRestaurant.distance} miles {'\n'} 
                                                             Address: {savedRestaurant.address} </Text> )

  
    return (
      <View style={styles.container}>
        <BackButton>
        </BackButton>
  
        <Text style={styles.row}>Saved Restaurants</Text>
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