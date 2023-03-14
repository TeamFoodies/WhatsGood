import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView } from "react-native";
import Constants from "expo-constants";

const logo = require('../../assets/noodle.png');

export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = () => {
    if (username.length === 0) {
      setErrorMsg("Please enter a username.");
      return;
    }

    if (password.length === 0) {
      setErrorMsg("Please enter a password.");
      return;
    }

    const route = global.url + 'login';
    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
      .then(response => response.json())
      .then(response => {
        switch (response.response) {
          case 200:
            global.key = response.key;
            global.username = username;
            navigation.navigate('home_screen');
            break;
          case 400:
          case 401:
          case 500:
            setErrorMsg(response.error);
            break;
          default:
            setErrorMsg('Unknown error occurred.');
            break;
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMsg('Could not connect to backend server.');
      })
  };

  const renderErrorMsg = () => {
    if (errorMsg != null) {
      return (
        <View>
          <Text>{errorMsg}</Text>
        </View>
      )
    }
    return <View></View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={logo} />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('create_acct_screen')}>
        <Text style={styles.createText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      {renderErrorMsg()}
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
