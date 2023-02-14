import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const logo = require('../../assets/icon.png');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>This is a centered box with three buttons</Text>
        <View style={styles.buttonContainer}>
          <Button title="View saved restaurants" onPress={() => {}} />
          <Button title="Log restaurant" onPress={() => {}} />
          <Button title="Log out" onPress={() => {}} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});