import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'

    },
    content: {
        paddingHorizontal: 25, 
        alignItems: 'center'
    },
    login: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    button: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
    }
});