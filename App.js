import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-native-paper';
import BottomNavigator from './screens/BottomNavigator';
import Chats from './screens/Chats';
import { colors } from './screens/colors';
import LoginScreen from './screens/LoginScreen';
import AboutScreen from './screens/settings/AboutScreen';
import AccountScreen from './screens/settings/AccountScreen';
import NotificationScreen from './screens/settings/NotificationScreen';
import { default as PrivacyScreen, default as SettingsScreen } from './screens/settings/PrivacyScreen';
import SignupScreen from './screens/SignupScreen';

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