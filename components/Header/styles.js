import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    header: {
        marginTop: 33,
        height: 67,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
    },
    header_left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 2,
    },
    logo: {
        width: 80,
        height: 80,
    },
    btn: {
        width: 110,
        height: 40,
        fontSize: 10,
        marginEnd: 7,
    },
    text: {
        fontSize: 18,
    },
});
