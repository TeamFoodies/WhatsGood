import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import  login_screen  from './src/pages/login_screen';
import addRestaurant_screen from './src/pages/addRestaurant_screen';
import addReview_screen from './src/pages/addReview_screen';
import create_acct_screen from './src/pages/create_acct_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            
            <Stack.Screen name="create_acct_screen" component={create_acct_screen} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}