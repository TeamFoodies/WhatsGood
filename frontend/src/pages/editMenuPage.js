import React, { Component } from "react";
//import { StatusBar } from "expo-status-bar";
import { TextInput, StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import { useNavigation } from '@react-navigation/native'

const MenuButton = ({ text }) => {
    return (
        <TouchableOpacity style={styles.editButton}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
};

const BackButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )


export default function App() {
    const navigation = useNavigation();

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
        alert('Item ' + item + ' updated')
    }

    return (
        <ScrollView>
            <View style = {styles.container}>
                <BackButton onPress={() => this.navigation.navigate('viewRestaurant_screen')} title = "back"/>
                <Text style={styles.row}>Edit Menu Item</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Item name"
                    placeholderTextColor = "#010101"
                    autoCapitalize = "none"
                    onChangeText = {this.handleItem}/>
                
                <TextInput style={styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Price"
                    placeholderTextColor = "#010101"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePrice}/>

                <TextInput style={styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Description"
                    placeholderTextColor = "#010101"
                    autoCapitalize = "none"
                    onChangeText = {this.handleDescription}/>
            </View>
            <View style={styles.buttonStyle}>
                <TouchableOpacity
                    style = {styles.editButton}
                    onPress = {
                        () => this.editItem(this.state.menu_item)
                    }>
                        <Text style = {styles.buttonText}> EDIT </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.saveButton}
                    onPress = {
                        () => this.editItem(this.state.menu_item)}>
                        <Text style = {styles.buttonText}> SAVE </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 23,
        justifyContent: 'center',
        backgroundColor: '79878D',
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
        borderColor: '#C4DAC2',
        borderWidth: 1
    },
    editButton: {
        elevation: 8,
        backgroundColor: "#C4DAC2",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    saveButton: {
        elevation: 8,
        backgroundColor: "#D6292C",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    }, 
    buttonStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonContainer: {
        backgroundColor: '#C4DAC2',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12, 
        marginLeft: -15,
        marginRight: 256,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '2E7DB7',
    },
});