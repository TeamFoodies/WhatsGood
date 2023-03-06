import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from "react-native";
import Constants from "expo-constants";

const logo = require('../../assets/noodle.png');

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authKey, setAuthKey] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleLogin = () => {
    // Check if authKey is valid before navigating to HomeScreen
    if (authKey === "123456") {
      navigation.navigate("HomeScreen");
    } else {
      alert("Invalid authorization key");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccountScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={logo} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Authorization Key."
          placeholderTextColor="#003f5c"
          onChangeText={(key) => setAuthKey(key)}
        />
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.btn} onPress={handleCreateAccount}>
        <Text style={styles.createText}>CREATE ACCNT</Text> 
      </TouchableOpacity> 
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#959889",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  image: {
    marginBottom: 40,
    width: "80%",
    height: undefined,
    aspectRatio: 1,
  },
  inputView: {
    backgroundColor: "#C4DAC2",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  btn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#C4DAC2",
  },
});
