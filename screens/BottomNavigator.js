//screens\BottomNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { colors } from './colors';
import ContactRow from './ContactRow';
import SettingsScreen from './settings/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Person') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.gray,
                tabBarStyle: { backgroundColor: colors.primary },
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
            })}
        >
            <Tab.Screen name="Person" component={ContactRow} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default BottomNavigator;