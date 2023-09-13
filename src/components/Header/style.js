import { StyleSheet, StatusBar } from 'react-native';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 60;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5d8aa8',
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 15,
        paddingEnd: 15,
        paddingBottom: 45

    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    username: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        paddingLeft: '5%'
    },
    buttonUser: {
        width: 45,
        height: 45,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }
});