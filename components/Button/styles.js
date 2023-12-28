import { StyleSheet } from 'react-native';
import { buttonColor, white } from '../../constant/color';

export const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: buttonColor,
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
