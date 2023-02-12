import { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const Box = ({ children }) => (
    <View style={styles.box}>
        {children}
    </View>
)

Box.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function App() {
  return (
    <View style={styles.app_container}>
       <Box>
            <Text style={styles.innerText}> What's Good?</Text>
       </Box>

       <View style={styles.title_container}>
            <Text style={{fontSize:30}}> Add A Restuarant</Text>
       </View>

       <View style={styles.entries_layout}>
            <Text style={styles.entries_titles}> Name: </Text>
            <TextInput style={styles.entryInput} placeholder="Restaurant Name..." />
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
  innerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '50',
  },
  title_container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  entries_layout: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 30,
  },
  entries_titles:{
    fontSize: 24,
    marginTop: 10,
  },
  entryInput:{
    borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    marginTop: 10,
    marginLeft: 10,
    padding: 8,
    marginBottom: 10,
    marginTop: 10,
  },
});
