import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import TabNavigator from './screens/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const headerNone = { headerShown: false };
    return (
        // <Support />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcom" component={Welcome} options={headerNone} />
                <Stack.Screen name="Register" component={Register} options={headerNone} />
                <Stack.Screen name="Login" component={Login} options={headerNone} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={headerNone} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={headerNone} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={headerNone} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    content: {
        backgroundColor: 'red',
    },
});
