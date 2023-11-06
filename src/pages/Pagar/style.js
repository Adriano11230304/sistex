import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
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
    list: {
        flex: 1,
        flexDirection: 'row'
    },
    textList: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '1%'
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#dcdcdc',
        fontSize: 15,
        color: '#111111'
    },
    searchArea: {
        paddingLeft: 15,
        paddingRight: 15,
        margin: '3%',
        borderRadius: 10,
        backgroundColor: '#dcdcdc',
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemList: {
        flex: 1,
        height: 70,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderBottomColor: 'gray'
    },
    iconeCategoria: {
        paddingLeft: '5%'
    },
    buttonText: {
        paddingRight: '5%',
        paddingTop: '2%'
    },
    textListPagar:{
        paddingLeft: '10%',
        width: 250,
        height: 65
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 28,
    }

});