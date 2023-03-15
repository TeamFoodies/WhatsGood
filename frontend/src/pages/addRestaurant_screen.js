import { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, {Marker} from "react-native-maps";

const URL = 'http://172.104.196.152:4000/';

const Box = ({ children }) => (
    <View style={styles.box}>
        {children}
    </View>
)

Box.propTypes = {
    children: PropTypes.node.isRequired,
}

const AddButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.addButton_container}>
      <Text style={styles.addButton_Text}>{title}Add</Text>
    </TouchableOpacity>
)

const MapSelector = (props) => {
  const [region, setRegion] = useState({latitude: 0, longitude: 0})

  function updateCenter(region) {
    setRegion(region);
    props.changeRegionFunc(region)
  }

  return (
    <MapView style={styles.mapSelector} onRegionChange={(region) => updateCenter(region)} showsUserLocation={true} >
      <Marker coordinate={region} key={0} />
    </MapView>
  )
}

export default function App({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({latitude: 0, longitude: 0})

  const handleAddRestaurant = () => {
    const route = global.url + 'restaurant/add';
    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, address: address, latitude: region.latitude, longitude: region.longitude, auth_key: global.key})
    })
      .then((response) => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            navigation.navigate('viewRestaurant2_screen', {restaurantId: response.restaurant.id, backScreen: 'home_screen'});
            break;
          default:
            break;
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.app_container}>
       <Box>
            <Text style={styles.boxText}> What's Good?</Text>
       </Box>

       <View style={styles.center_container}>
            <Text style={styles.subtitle_Text}> Add A Restaurant</Text>
       </View>

       <View style={styles.entries_layout}>
            <Text style={styles.entries_titles}>     Name: </Text>
            <TextInput style={styles.entryInput} placeholder="Restaurant Name..." onChangeText={(text) => setName(text)} />
       </View>

       <View style={styles.entries_layout}>
            <Text style={styles.entries_titles}> Address: </Text>
            <TextInput style={styles.entryInput} placeholder="Include City, State, Zip Code..." onChangeText={text => setAddress(text)} />
       </View>

       <View style={styles.center_container}>
         <MapSelector changeRegionFunc={setRegion}/>


         <AddButton onPress={() => handleAddRestaurant()}>
         </AddButton>
       </View>

    </View>
  );
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1,
    backgroundColor: '#959889',
  },
  box: {
    backgroundColor: '#C4DAC2',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#C4DAC2',
    padding: 10,
    margin: 0,
    marginBottom: 20,
  },
  boxText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '50',
  },
  center_container: {
    alignItems: 'center',
    marginBottom: 15,
  },
  entries_layout: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
  },
  entries_titles:{
    fontSize: 24,
    marginTop: 12,
  },
  entryInput:{
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
    width: '65%',
    height: '70%',
    marginTop: 10,
    marginLeft: 10,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
  },
  addButton_container: {
    elevation: 8,
    backgroundColor: "#C4DAC2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  addButton_Text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  subtitle_Text:{
    fontSize: 35,
  },
  mapSelector: {
    alignSelf: 'center',
    width: '90%',
    height: '60%',
    marginTop: '5%',
    marginBottom: '5%'
  }
});
