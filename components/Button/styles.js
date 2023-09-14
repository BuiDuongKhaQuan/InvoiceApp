import { StyleSheet } from 'react-native';
import { buttonColor, white } from '../../constant/color';

export const styles = StyleSheet.create({
    btn: {
        width: 150,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: white,
        backgroundColor: buttonColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
    },
    btnLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: white,
    },
});
