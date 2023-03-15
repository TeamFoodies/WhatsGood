import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";
import {FontAwesome5} from "@expo/vector-icons";

const CustomButton = ({ title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function App({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const route = global.url + 'logout';
    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({auth_key: global.key})
    })
      .then(_ => {
        // No matter the response, just assume the user logged out
        global.key = undefined;
        navigation.navigate('login_screen');
      })
      .catch(_ => {
        // Same if an error occurs
        global.key = undefined;
        navigation.navigate('login_screen');
      })
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <LinearGradient colors={['#000000ee', '#00000000']} style={styles.header_container}>
        <View style={styles.header_view}>
          <TouchableOpacity style={styles.menu_touchable_opacity} onPress={() => setMenuOpen(!menuOpen)}>
            <FontAwesome5
              name={'bars'}
              size={30}
              style={styles.menu_bars}
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {
        menuOpen ? (
          <View style={styles.box}>
            <Text style={styles.boxText}>HOME</Text>
            <View style={styles.buttonContainer}>
              <CustomButton title="View restaurants" onPress={() => navigation.navigate('homeViewRestaurant_screen')} />
              <CustomButton title="View saved restaurants" onPress={() => navigation.navigate('viewSavedRestaurant_screen')} />
              <CustomButton title="Log restaurant" onPress={() => navigation.navigate('viewRestaurant2_screen', {itemId: 1, url: 'https://google.com/'})} />
              <CustomButton title="Log out" onPress={() => handleLogout()} />
            </View>
          </View>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#959889",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header_container: {
    width: '100%',
    backgroundColor: 'transparent',
    height: 100,
    paddingHorizontal: 30,
    paddingTop: 45
  },
  header_view: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "center",
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#C4DAC2",
    borderRadius: 30,
    padding: 20,
  },
  boxText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFC300",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  map: {
    position: "absolute",
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  menu_touchable_opacity: {
    marginRight: 'auto'
  },
  menu_bars: {
    color: '#e8e8e8'
  },
  transparent: {
    color: 'transparent',
    backgroundColor: 'transparent'
  }
});