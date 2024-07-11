import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './screens/DrawerNavigation';
import { UserProvider } from './screens/UserContext';
import ChangePassword from './screens/ChangePassword';
import './constant/translations/DCSLocalize';
import Language from './screens/Setting/Language';
import Notification from './screens/Setting/Notification';
import ResetPassword from './screens/ResetPassword';
export default function App() {
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={headerNone} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                    <Stack.Screen name="Drawer" component={DrawerNavigation} options={headerNone} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} options={headerNone} />
                    <Stack.Screen name="Language" component={Language} options={headerNone} />
                    <Stack.Screen name="Notification" component={Notification} options={headerNone} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={headerNone} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({});
