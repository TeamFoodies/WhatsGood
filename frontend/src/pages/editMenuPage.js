import React, { Component, useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
//import { useNavigation } from '@react-navigation/native'

const URL = 'http://172.104.196.152.4000/';

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
      <Text style={styles.backButtonText}>{title}</Text>
    </TouchableOpacity>
)

// sample list of menu items
const menuItems = [
    {
      id: 1,
      item: 'Popcorn chicken', 
      price: 8,
      description: 'Savory deep fried chicken with basil',
    },
    {
      id: 2,
      item: 'Borger',
      price: 10,
      description: 'USDA beef on brioche bun',
    },
    {
      id: 3,
      item: 'Taco',
      price: 1,
      description: 'Corn tortilla with carne asada',
    },
]

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

class Inputs extends Component {
    
    state = {
        menu_item: '',
        price: '',
        description: '',
    }
    handleItem = (text) => {
        this.setState({ menu_item: text })
    }
    handlePrice = (number) => {
        this.setState({ price: number })
    }
    handleDescription = (text) => {
        this.setState({ description: text })
    }
    editItem = (item) => {
        // at the moment just have it alert the user
        alert('Item ' + item + ' updated')
    }

    render() {
        if (data == null) return null;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <BackButton onPress={() => this.props.navigation.navigate('viewRestaurant_screen')} title = "back"/>
                    <Text style={styles.row}>Edit Menu Item</Text>
                    {data.menu === undefined ? null : data.menu.map((item) => (
                    <View key={index}>
                        <TextInput style={styles.input}
                            underlineColorAndroid = "transparent"
                            defaultValue = {item.item}
                            placeholderTextColor = "#010101"
                            autoCapitalize = "none"
                            onChangeText = {this.handleItem}/>
                        
                        <TextInput style={styles.input}
                            underlineColorAndroid = "transparent"
                            defaultValue = {item.price.toString()}
                            placeholderTextColor = "#010101"
                            autoCapitalize = "none"
                            onChangeText = {this.handlePrice}/>

                        <TextInput style={styles.input}
                            underlineColorAndroid = "transparent"
                            defaultValue = {item.description}
                            placeholderTextColor = "#010101"
                            autoCapitalize = "none"
                            onChangeText = {this.handleDescription}/>

                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style = {styles.editButton}
                                onPress = {
                                    () => this.editItem(this.state.data)
                                }>
                                <Text style = {styles.buttonText}> EDIT </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {styles.saveButton}
                                onPress = {
                                    () => this.editItem(this.state.data)
                                }>
                                <Text style = {styles.buttonText}> SAVE </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
} 
export default Inputs


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 23,
        justifyContent: 'center',
        backgroundColor: '#959889',
    },
    row: {
        padding: 15, 
        fontSize: 35,
        textAlign: 'center',
        color: '2E7DB7',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#E6E3D3',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#E6E3D3',
    },
    editButton: {
        flex: 1,
        elevation: 4,
        backgroundColor: "#C4DAC2",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    saveButton: {
        flex: 1,
        elevation: 4,
        backgroundColor: "#D6292C",
        borderRadius: 20,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    backButtonContainer: {
        backgroundColor: '#C4DAC2',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12, 
        marginLeft: 5,
        marginRight: 280,
        marginTop: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 15,
        color: '2E7DB7',
    },
});
