import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/Setting/ChangePassword';
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
import Notification from './screens/Setting/Notification';
import Setting from './screens/Setting/Setting';
import Support from './screens/Setting/Support';
import Home from './screens/Home';
import CreateInvoice from './screens/CreateInvoice';
import Chat from './screens/Chat';
import ProfileCompany from './screens/Company/ProfileCompany';
import Header from './components/Header';
import ValidateEmail from './screens/ValidateEmail';
import ResetPassword from './screens/ResetPassword';
import Information from './screens/Setting/Information';
import { UserProvider } from './screens/UserContext';
import Invoice10 from './layouts/Invoice/Invoice10';

export default function App() {
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (
        // <CreateInvoice />
        <UserProvider>
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
                    <Stack.Screen name="Home" component={Home} options={headerNone} />
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
                    <Stack.Screen name="Language" component={Language} options={headerNone} />
                    <Stack.Screen name="Notification" component={Notification} options={headerNone} />
                    <Stack.Screen name="Setting" component={Setting} options={headerNone} />
                    <Stack.Screen name="Support" component={Support} options={headerNone} />
                    <Stack.Screen name="Information" component={Information} options={headerNone} />
                    <Stack.Screen name="Header" component={Header} />
                    <Stack.Screen name="ValidateEmail" component={ValidateEmail} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({});
