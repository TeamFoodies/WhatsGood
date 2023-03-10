import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const CustomButton = ({ title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>HOME</Text>
        <View style={styles.buttonContainer}>
          <CustomButton title="View saved restaurants" onPress={() => navigation.navigate('viewSavedRestaurant_screen')} />
          <CustomButton title="Log restaurant" onPress={() => navigation.navigate('addRestaurant_screen')} />
          <CustomButton title="Log out" onPress={() =>navigation.navigate('login_screen')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#959889",
    alignItems: "center",
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
});