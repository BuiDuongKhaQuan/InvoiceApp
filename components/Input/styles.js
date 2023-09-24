import { StyleSheet } from 'react-native';
import { white } from '../../constant/color';
import { fontSizeDefault } from '../../constant/fontSize';

export const styles = StyleSheet.create({
    input: {
        width: '90%',
        alignContent: 'center',
        backgroundColor: white,
        marginHorizontal: 10,
        marginVertical: 7,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, // Điều chỉnh vị trí bóng (đối với iOS)
        shadowOpacity: 0.5, // Điều chỉnh độ trong suốt của bóng (đối với iOS)
        shadowRadius: 5, // Điều chỉnh bán kính của bóng (đối với iOS)
        elevation: 3,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input_icon: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
        marginHorizontal: 14,
    },
    input_text: {
        flex: 1,
        fontSize: fontSizeDefault,
        marginVertical: 15,
    },
    text_validate: {
        marginLeft: 50,
        marginTop: -10,
        marginBottom: 5,
        color: 'red',
    },
});
