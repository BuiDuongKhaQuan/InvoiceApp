import { StatusBar, StyleSheet } from 'react-native';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';
import { statusBarHeight } from '../../constant/dimistion';

export const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        zIndex: 100,
        top: statusBarHeight,
        height: 67,
        backgroundColor: white,
        width: '100%',
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
        width: 60,
        height: 50,
        marginHorizontal: 10,
        resizeMode: 'stretch',
    },
    logo_text: {
        height: 25,
        resizeMode: 'stretch',
    },
    title: {
        color: '#B3B70A',
        fontWeight: 'bold',
        width: '40%',
        textShadowColor: '#2AA50B',
        textShadowRadius: 1,
        textShadowOffset: { width: 2, height: 2 },
        fontSize: fontSizeDefault + 7,
    },
    btn: {
        width: 110,
        height: 40,
        marginEnd: 7,
    },
    text: {
        fontSize: fontSizeDefault - 2,
    },
    radius_90: {
        borderRadius: 90,
        width: 50,
    },
});
