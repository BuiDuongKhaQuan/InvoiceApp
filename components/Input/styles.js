import { StyleSheet } from 'react-native';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';

export const styles = StyleSheet.create({
    input: {
        flexDirection: 'column',
        width: 340,
        height: 60,
        alignContent: 'center',
        backgroundColor: white,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
    },
    input_icon: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        marginHorizontal: 14,
        marginVertical: 14,
    },
    input_text: {
        width: 270,
        fontSize: fontSizeDefault,
        marginVertical: 15,
    },
    text_validate: {
        marginLeft: 50,
        marginVertical: 3,
        color: 'red',
    },
});
