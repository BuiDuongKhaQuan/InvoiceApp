import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import TabNavigator from './components/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Scanner from './screens/Scanner';
import Invoice2 from './screens/Invoice2';
import Bills from './screens/Bills';

import Profile from './screens/Company/Profile';

const Stack = createNativeStackNavigator();
export default function App() {
    const headerNone = { headerShown: false };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcom">
                <Stack.Screen name="Welcom" component={Welcome} options={headerNone} />
                <Stack.Screen name="Register" component={Register} options={headerNone} />
                <Stack.Screen name="Login" component={Login} options={headerNone} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={headerNone} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={headerNone} />
                <Stack.Screen name="Scanner" component={Scanner} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
