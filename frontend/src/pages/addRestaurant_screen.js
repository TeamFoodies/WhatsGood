import { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
  },
  innerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '50',
  },
});
