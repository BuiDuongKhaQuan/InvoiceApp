// TabNavigator.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Home from '../../screens/Home';
import Search from '../../screens/Search';
import Chat from '../../screens/Chat';
import { buttonColor, white } from '../../constant/color';
import Popup from '../Popup';
import Button from '../Button';
import Profile from '../../screens/Profile';
import { useUserContext } from '../../screens/UserContext';
import ProfileCompany from '../../screens/Company/ProfileCompany';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const { state } = useUserContext();
    const user_role = state.user.roles;
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const Plus = () => <View></View>;

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} bottom />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: white,
                        height: 50,
                    },
                    tabBarActiveTintColor: buttonColor,
                    tabBarInactiveTintColor: 'black',
                    tabBarShowLabel: true,
                    keyboardHandlingEnabled: false,
                    unmountOnBlur: true,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
                    }}
                />

                <Tab.Screen
                    name="Plus"
                    component={Plus}
                    options={{
                        headerShown: false,
                        tabBarButton: (props) => (
                            <Button
                                customStylesIcon={{
                                    width: 35,
                                    height: 35,
                                    marginVertical: 8,
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}
                                iconRight={<AntDesign name="plussquareo" size={30} color="black" />}
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
                        tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={size} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={user_role == 'ROLE_USER' ? 'Profile' : 'ProfileCompany'}
                    component={user_role == 'ROLE_USER' ? Profile : ProfileCompany}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) =>
                            user_role == 'ROLE_USER' ? (
                                <AntDesign name="user" size={size} color={color} />
                            ) : (
                                <FontAwesome name="building-o" size={size} color={color} />
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
