import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import TabNavigator from './components/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Bills from './screens/Company/Bills';
import Search from './screens/Search';
import Scanner from './screens/Scanner';
import WatchBill from './screens/Company/WatchBill';
import BillSample from './screens/Company/BillSample';
import EditBill from './screens/Company/EditBill';
import Staff from './screens/Company/Staff';
import Statistical from './screens/Company/Statistical';
import Language from './screens/Setting/Language';
import NotificationSetting from './screens/Setting/NotificationSetting';
import Setting from './screens/Setting/Setting';
import Support from './screens/Setting/Support';
import Home from './screens/Home';
import CreateInvoice from './screens/CreateInvoice';
import Chat from './screens/Chat';
import ProfileCompany from './screens/Company/ProfileCompany';
import Header from './components/Header';

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
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateInvoice" component={CreateInvoice} options={headerNone} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Bills" component={Bills} />
                <Stack.Screen name="BillSample" component={BillSample} />
                <Stack.Screen name="EditBill" component={EditBill} />
                <Stack.Screen name="ProfileCompany" component={ProfileCompany} />
                <Stack.Screen name="Staff" component={Staff} />
                <Stack.Screen name="Statistical" component={Statistical} />
                <Stack.Screen name="WatchBill" component={WatchBill} />
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="NotificationSetting" component={NotificationSetting} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="Support" component={Support} />
                <Stack.Screen name="Header" component={Header} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
