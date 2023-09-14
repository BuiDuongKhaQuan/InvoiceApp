import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import MenuBar from './components/MenuBar';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import InvoiceItem from './components/InvoiceItem';
import InvoiceList from './screens/InvoiceList';
import Setting from './screens/Setting';

export default function App() {
    return <Setting />;
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
