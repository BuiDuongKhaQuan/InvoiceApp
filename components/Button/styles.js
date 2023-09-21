import { StyleSheet } from 'react-native';
import { buttonColor, white } from '../../constant/color';

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
    btnLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: white,
    },
});
