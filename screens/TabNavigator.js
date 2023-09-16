// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import Setting from './Setting';
import Support from './Support';
import Home from './Home';
import Search from './Search';
import Plus from './Plus';
import Profile from './Profile';
import { View } from 'react-native';
import { buttonColor, white } from '../constant/color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: white, // Màu nền của tab bar
                },
                tabBarActiveTintColor: buttonColor, // Màu sắc cho tab được chọn
                tabBarInactiveTintColor: 'gray', // Màu sắc cho tab không được chọn
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={40} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={33} />,
                }}
            />
            <Tab.Screen
                name="Plus"
                component={Plus}
                options={{
                    headerShown: false,

                    tabBarIcon: ({ color, size }) => <Feather name="plus" size={33} color={color} />,
                }}
            />
            <Tab.Screen
                name="Support"
                component={Support}
                options={{
                    headerShown: false,

                    tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={33} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,

                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={33} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
