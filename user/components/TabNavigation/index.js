// TabNavigator.js
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';
import Home from '../../screens/Home';
import Blog from '../../screens/Blog';
import Chat from '../../screens/Chat';
import { buttonColor, white } from '../../constant/color';
import Popup from '../Popup';
import Button from '../Button';
import Profile from '../../screens/Profile';
import { useUserContext } from '../../screens/UserContext';
import ProfileCompany from '../../screens/Company/ProfileCompany';
import { useTranslation } from 'react-i18next';
import { botomHeight } from '../../constant/dimistion';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const { state } = useUserContext();
    const user_role = state.user.roles;
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const Plus = () => <View></View>;
    const { t } = useTranslation();

    return (
        <>
            <Popup visible={isPopupVisible} onClose={togglePopup} bottom />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: white,
                        height: botomHeight,
                    },
                    tabBarActiveTintColor: buttonColor,
                    tabBarInactiveTintColor: 'black',
                    tabBarShowLabel: true,
                    keyboardHandlingEnabled: false,
                    unmountOnBlur: true,
                }}
            >
                <Tab.Screen
                    name={t('common:home')}
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={t('common:chat')}
                    component={Chat}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={size} color={color} />,
                    }}
                />

                <Tab.Screen
                    name={t('common:plus')}
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
                    name={t('common:Blog')}
                    component={Blog}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color, size }) => <FontAwesome name="newspaper-o" size={24} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={user_role == 'ROLE_USER' ? t('common:profile') : t('common:company')}
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
