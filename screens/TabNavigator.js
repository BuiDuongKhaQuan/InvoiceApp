// TabNavigator.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Home from './Home';
import Search from './Search';
import Plus from './Plus';
import Profile from './Profile';
import Chat from './Chat';
import { buttonColor, white } from '../constant/color';
import Popup from '../components/Popup';
import Button from '../components/Button';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: white,
                        height: 50,
                    },
                    tabBarActiveTintColor: buttonColor,
                    tabBarInactiveTintColor: '#5a5a5a',
                    tabBarShowLabel: false,
                    keyboardHandlingEnabled: false,
                    unmountOnBlur: true,
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
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={33} />,
                    }}
                />

                <Tab.Screen
                    name="Plus"
                    component={Plus}
                    options={{
                        headerShown: false,
                        tabBarButton: (props) => (
                            <Button
                                customStylesIcon={{ width: 35, height: 35, marginVertical: 8, marginHorizontal: 20 }}
                                iconLeft={require('../assets/icons/plus.png')}
                                onPress={togglePopup}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={33} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false,

                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={33} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default TabNavigator;
