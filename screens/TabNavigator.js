// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View, Icon } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import Setting from './Setting';
import Chat from './Chat';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
