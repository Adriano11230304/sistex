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
        width: 110,
        height: 40,
        marginLeft: 10,
      },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        fontSize: 23,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttons:{
        flexDirection: 'row',
        paddingLeft: '10%'
    },
    buttonsFinal: {
        flexDirection: 'row',
        paddingBottom: '5%'
    },
    title: {
        backgroundColor: '#5d8aa8',
        paddingBottom: '5%',
        alignItems: 'center'
    },
    list: {
        flex: 1,
        flexDirection: 'row'
    },
    textList: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: '1%',
        paddingLeft: '5%'
    },
    itemList: {
        flex: 1,
        height: 75,
        paddingTop: '3%',
        paddingLeft: '5%',
        flexDirection: 'row',
        borderBottomColor: 'gray'
    },
    textListPagar: {
        flex: 1,
        paddingLeft: '5%',
        flexDirection: 'column',
    },
    buttonTextLixeira: {
        paddingTop: '2%',
        paddingRight: '5%'
    },
    pagesNext: {
        flexDirection: 'row',
        paddingTop: '3%',
        paddingLeft: '3%'
    },
});