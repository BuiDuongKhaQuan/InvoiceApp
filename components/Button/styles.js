import { StyleSheet } from 'react-native';
import { white } from '../../constant/color';

export const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#2c8b3a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: white,
    },
});
