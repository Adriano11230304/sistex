import { StyleSheet, StatusBar } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5d8aa8',
        paddingTop: 40,
        flexDirection: 'row',
        paddingStart: 15,
        paddingEnd: 15,
        paddingBottom: 20

    },
    content: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    username: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        paddingLeft: '5%',
        paddingTop: '5%'
    },
    buttonUser: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonLogout: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    }
});