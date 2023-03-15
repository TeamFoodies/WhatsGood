import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {WGMapView} from '../components/WGMapView';

const CustomButton = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon}
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
      <WGMapView style={styles.map} navigation={navigation} />
      <View style={styles.header_container}>
        <View style={styles.header_view}>
          <TouchableOpacity style={styles.menu_touchable_opacity} onPress={() => setMenuOpen(!menuOpen)}>
            <FontAwesome5
              name={'bars'}
              size={30}
              style={styles.menu_bars}
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
      </View>
      {
        menuOpen ? (
          <View style={styles.box}>
            <View style={styles.buttonContainer}>
              <CustomButton title="All Restaurants" onPress={() => navigation.navigate('homeViewRestaurant_screen')}
                            icon = {(<MaterialCommunityIcons
                              name={'food-fork-drink'}
                              size={20}
                              style={styles.menuIcon}
                            ></MaterialCommunityIcons>)}
              />
              <CustomButton title="Favorites" onPress={() => navigation.navigate('viewSavedRestaurant_screen')}
                            icon = {(<AntDesign
                              name={'heart'}
                              size={20}
                              style={styles.menuIcon}
                            ></AntDesign>)}
              />
              <CustomButton title="Submit Restaurant" onPress={() => navigation.navigate('viewRestaurant2_screen', {itemId: 1, url: 'https://google.com/'})}
                            icon = {(<Entypo
                              name={'pin'}
                              size={20}
                              style={styles.menuIcon}
                            ></Entypo>)}
              />
              <CustomButton title="Log Out" onPress={() => handleLogout()}
                            icon = {(<MaterialCommunityIcons
                              name={'exit-run'}
                              size={20}
                              style={styles.menuIcon}
                            ></MaterialCommunityIcons>)}
              />
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
    marginLeft: 0,
  },
  boxText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    marginTop: 5,
    justifyContent: 'center'
  },
  menuIcon: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: "#00000033",
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    paddingVertical: 10,
    paddingRight: 30,
    paddingLeft: 30,
    alignItems: "center",
    marginBottom: 3,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 10,
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
    color: '#ffffff'
  },
  transparent: {
    color: 'transparent',
    backgroundColor: 'transparent'
  }
});