import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 127,
        marginTop: 15,
        borderRadius: 50,
        marginBottom: 50
    },
    title: {
        backgroundColor: '#5d8aa8',
        paddingBottom: '5%',
        alignItems: 'center'
    },
    text: {
        fontSize: 23,
        backgroundColor: '#5d8aa8',
        color: '#fff',
        fontWeight: 'bold',
    },
    textDados: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 15
    },
    salvar: {
        backgroundColor: '#5d8aa8',
        borderRadius: 20,
        width: 150,
        height: 60,
        alignSelf: 'center',
        marginTop: '5%'
    },
    salvarText: {
        paddingTop: '5%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
});