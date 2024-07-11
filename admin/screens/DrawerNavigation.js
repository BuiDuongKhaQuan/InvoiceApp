import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { useUserContext } from './UserContext';
import Home from './Home';
import Profile from './Profile';
import Bill from './Bill';
import Customer from './Customer';
import Company from './Company';
import Products from './Products';
import Button from '../components/Button';
import Setting from './Settings';
import { useTranslation } from 'react-i18next';
export default function DrawerNavigation({ navigation }) {
    const { t } = useTranslation();
    const Drawer = createDrawerNavigator();
    const { state, dispatch } = useUserContext();
    const handleLogOut = () => {
        dispatch({
            type: 'SIGN_OUT',
        });
        navigation.navigate('Login');
    };

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => {
                return (
                    <SafeAreaView>
                        <View style={styles.container}>
                            <Image
                                style={styles.wallpaper}
                                source={
                                    state.user.wallpaper == null
                                        ? require('../assets/images/default-wallpaper.png')
                                        : { uri: state.user.wallpaper }
                                }
                            />
                            <Image
                                source={
                                    state.user.image == null
                                        ? require('../assets/images/default-avatar.png')
                                        : { uri: state.user.image }
                                }
                                style={styles.avartar}
                            />
                            <Text style={styles.name}>{state.user.name}</Text>
                        </View>
                        <DrawerItemList {...props} />
                        <Button
                            onPress={handleLogOut}
                            text={t('common:logout')}
                            customStylesBtn={{ backgroundColor: 'transparent', marginLeft: 13, borderWidth: 0 }}
                            customStylesText={{ color: 'gray', textAlign: 'left', fontSize: 15, marginLeft: 20 }}
                            iconLeft={<Entypo name="log-out" size={24} color="black" />}
                        />
                    </SafeAreaView>
                );
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerLabel: t('common:home'),
                    title: t('common:home'),
                    drawerIcon: () => <AntDesign name="home" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerLabel: t('common:profile'),
                    title: t('common:profile'),
                    drawerIcon: () => <MaterialCommunityIcons name="shield-account-outline" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Product Management"
                component={Products}
                options={{
                    drawerLabel: t('common:productManagement'),
                    title: t('common:productManagement'),
                    drawerIcon: () => <AntDesign name="profile" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Invoice Management"
                component={Bill}
                options={{
                    drawerLabel: t('common:invoiceManagement'),
                    title: t('common:invoiceManagement'),
                    drawerIcon: () => <AntDesign name="filetext1" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Customer Management"
                component={Customer}
                options={{
                    drawerLabel: t('common:customerManagement'),
                    title: t('common:customerManagement'),
                    drawerIcon: () => <MaterialCommunityIcons name="account-group" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Business Management"
                component={Company}
                options={{
                    drawerLabel: t('common:businessManagement'),
                    title: t('common:businessManagement'),
                    drawerIcon: () => <MaterialCommunityIcons name="warehouse" size={24} color="black" />,
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Setting}
                options={{
                    drawerLabel: t('common:setting'),
                    title: t('common:setting'),
                    drawerIcon: () => <MaterialCommunityIcons name="cog" size={24} color="black" />,
                }}
            />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#ccc',
    },
    wallpaper: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    avartar: {
        width: 90,
        height: 90,
        borderRadius: 65,
        borderWidth: 1,
        borderColor: 'gray',
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        borderRadius: 5,
    },
});
