import { StatusBar, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get('window');
const logo = require('../../assets/noodle.png');

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputWidth = width * 0.7;
  const inputHeight = height * 0.05;
  const btnWidth = width * 0.8;
  const btnHeight = height * 0.07;

  return (
    <View style={styles.container}>
      <Image style = {[styles.image, { height: height * 0.2 }]} source={logo} />
      <StatusBar style="auto" />
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
        </View> 
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View>
      <TouchableOpacity style={[styles.btn, { width: btnWidth, height: btnHeight }]}>
        <Text style={styles.create_acct_text}>CREATE</Text> 
      </TouchableOpacity> 
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
  image: {
    width: "100%",
    resizeMode: 'contain',
    marginBottom: 0.05 * height,
  },
  inputView: {
    backgroundColor: "#C4DAC2",
    borderRadius: 30,
    marginBottom: 0.03 * height,
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 0.02 * width,
  },
  TextInput: {
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  btn: {
    borderRadius: 25,
    marginTop: 0.05 * height,
    backgroundColor: "#C4DAC2",
    alignItems: "center",
    justifyContent: "center",
  },
  create_acct_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  }
});

