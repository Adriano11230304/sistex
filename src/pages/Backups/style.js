import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: '5%',
        backgroundColor: '#5d8aa8',
        borderRadius: 50,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '3%',
        width: 160,
        height: 40,
        marginLeft: 10,
      },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttons:{
        flexDirection: 'row',
    },
    buttonsFinal: {
        flex: 1,
        flexDirection: 'column-reverse',
        paddingBottom: '5%',
        alignContent: 'center',
        alignItems: 'center'
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
});