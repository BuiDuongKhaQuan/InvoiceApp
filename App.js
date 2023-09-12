import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';

export default function App() {
    return <Register />;
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
