import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';

//screens
import  login_screen  from './src/pages/login_screen';
import addRestaurant_screen from './src/pages/addRestaurant_screen';
import addReview_screen from './src/pages/addReview_screen';
import home_screen from './src/pages/home_screen';
import create_acct_screen from './src/pages/create_acct_screen';
import viewReview_screen from './src/pages/viewReview_screen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name='viewReview_screen' component={viewReview_screen} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
  );
}