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

export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const inputWidth = width * 0.7;
  const inputHeight = height * 0.05;
  const btnWidth = width * 0.8;
  const btnHeight = height * 0.07;

  function handleCreateAccount() {// Send a POST request to the backend
    // Check the password fields to ensure they are the same
    if (password !== confirmPassword) {
      setErrorMsg('Your passwords do not match.');
      return;
    }

    const route = global.url + 'create_account';
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
            navigation.navigate('home_screen');
            break;
          case 400:
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
  }

  const renderErrorMsg = () => {
    if (errorMsg !== null) {
      return (
        <View>
          <Text>{errorMsg}</Text>
        </View>
      );
    }
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <Image style = {[styles.image, { height: height * 0.2 }]} source={logo} />
      <StatusBar style="auto" />
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
          autoCapitalize='none'
        /> 
      </View> 
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
        </View> 
      <View style={[styles.inputView, { width: inputWidth, height: inputHeight }]}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        /> 
      </View>
      <TouchableOpacity style={[styles.btn, { width: btnWidth, height: btnHeight }]} onPress={handleCreateAccount}>
        <Text style={styles.create_acct_text}>CREATE</Text> 
      </TouchableOpacity>
      {renderErrorMsg()}
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
