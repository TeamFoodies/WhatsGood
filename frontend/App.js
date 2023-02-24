import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';

//screens
import  login_screen  from './src/pages/login_screen';
import addRestaurant_screen from './src/pages/addRestaurant_screen';
import addReview_screen from './src/pages/addReview_screen';
import viewMenu_screen from './src/pages/viewMenu_screen';
import home_screen from './src/pages/home_screen';
import create_acct_screen from './src/pages/create_acct_screen';
import viewRestaurant_screen from './src/pages/viewRestaurant_screen';
import viewSavedRestaurant_screen from './src/pages/viewSavedRestaurant_screen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="ViewMenu">
          <Stack.Screen name="viewMenu_screen" component={viewMenu_screen} options={{headerShown: false}} />
            <Stack.Screen name="home_screen" component={home_screen} options={{headerShown: false}} />
            <Stack.Screen name="viewRestaurant_screen" component={viewRestaurant_screen} options={{headerShown: false}} />
            <Stack.Screen name="login_screen" component={login_screen} options={{headerShown: false}} />
            <Stack.Screen name="addRestaurant_screen" component={addRestaurant_screen} options={{headerShown: false}} />
            <Stack.Screen name="addReview_screen" component={addReview_screen} options={{headerShown: false}} />
           
            <Stack.Screen name="create_acct_screen" component={create_acct_screen} options={{headerShown: false}} />
            <Stack.Screen name="viewSavedRestaurant_screen" component={viewSavedRestaurant_screen} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}