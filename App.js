import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SettingsScreen from './screens/SettingsScreen';
import Chats from './screens/Chats';
import { Provider } from 'react-native-paper';
import BottomNavigator from './screens/BottomNavigator';
import AccountScreen from './screens/AccountScreen';
import NotificationScreen from './screens/NotificationScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import AboutScreen from './screens/AboutScreen';
import { colors } from './screens/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}   name="LoginScreen"  component={LoginScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="SignupScreen" component={SignupScreen} />
          <Stack.Screen  name="Settings" component={SettingsScreen} options={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white, }} />
          <Stack.Screen  name="Messages"  component={Chats} options={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white, }} />
          <Stack.Screen  options={{ headerShown: false }} name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerStyle: { backgroundColor: colors.primary } ,headerTintColor: colors.white, }}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerStyle: { backgroundColor: colors.primary, }, headerTintColor: colors.white }}/>
          <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ headerStyle: { backgroundColor: colors.primary },headerTintColor: colors.white }}/>
          <Stack.Screen   name="AboutScreen" component={AboutScreen} options={{ headerStyle: { backgroundColor: colors.primary, }, headerTintColor: colors.white }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
