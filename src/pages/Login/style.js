import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#4682B4',

    },
    content: {
        paddingHorizontal: 25,
        marginTop: '14%',
        marginBottom: '8%',
        alignItems: 'center'
    },
    login: {
        fontSize: 28,
        fontWeight: '500',
        marginBottom: 30,
        color: '#F0F8FF',
        fontWeight: 'bold'
    },
    button: {
        borderColor: '#ddd',
        backgroundColor: '#4682B4',
        borderWidth: 2,
        borderRadius: 28,
        paddingHorizontal: 30,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    },
    buttonText:{
        color: '#F0F8FF',
    },
    register: { 
        color: '#AD40AF', 
        fontWeight: '700',
        color: '#BA55D3',
    },
    nowRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    textNowRegister: {
        
    },
    title:{
        marginTop: '10%',
        fontSize: 20
    },
    input: {
        fontSize: 16,
        marginTop: '5%',
        
    },
    form:{
        flex: 1,
        backgroundColor: '#fff',
        paddingEnd: '5%',
        paddingStart: '5%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
});