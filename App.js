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
import {
    Invoice1,
    Invoice2,
    Invoice3,
    Invoice4,
    Invoice5,
    Invoice6,
    Invoice7,
    Invoice8,
    Invoice9,
    Invoice10,
    Invoice11,
    Invoice12,
} from './layouts/Invoice';
export default function App() {
    const Stack = createNativeStackNavigator();
    const headerNone = { headerShown: false };
    return (
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
                    <Stack.Screen name="Bills" component={Bills} options={headerNone} />
                    <Stack.Screen name="BillSample" component={BillSample} />
                    <Stack.Screen name="EditBill" component={EditBill} />
                    <Stack.Screen name="ProfileCompany" component={ProfileCompany} options={headerNone} />
                    <Stack.Screen name="Staff" component={Staff} options={headerNone} />
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
                    <Stack.Screen name="Invoice1" component={Invoice1} />
                    <Stack.Screen name="Invoice2" component={Invoice2} />
                    <Stack.Screen name="Invoice3" component={Invoice3} />
                    <Stack.Screen name="Invoice4" component={Invoice4} />
                    <Stack.Screen name="Invoice5" component={Invoice5} />
                    <Stack.Screen name="Invoice6" component={Invoice6} />
                    <Stack.Screen name="Invoice7" component={Invoice7} />
                    <Stack.Screen name="Invoice8" component={Invoice8} />
                    <Stack.Screen name="Invoice9" component={Invoice9} />
                    <Stack.Screen name="Invoice10" component={Invoice10} />
                    <Stack.Screen name="Invoice11" component={Invoice11} />
                    <Stack.Screen name="Invoice12" component={Invoice12} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
