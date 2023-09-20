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
import CreateInvoice from './screens/CreateInvoice';

import Profile from './screens/Company/Profile';
import Invoice from './layouts/Invoice/Invoice';
import WatchBill from './screens/Company/WatchBill';
import Bills from './screens/Company/Bills';
import EditBill from './screens/Company/EditBill';
import Statistical from './screens/Company/Statistical';
import BillSample from './screens/Company/BillSample';
import Search from './screens/Search';
import ValidateEmail from './screens/ValidateEmail';
export default function App() {
    const Stack = createNativeStackNavigator();
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
                <Stack.Screen name="Bills" component={Bills} />
                <Stack.Screen name="WatchBill" component={WatchBill} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
