import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    btn: {
        width: 150,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: '#55DF49',
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
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
