import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import  example_screen  from './src/pages/example_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="example_screen" component={example_screen} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}