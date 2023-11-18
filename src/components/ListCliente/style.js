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
    },
    textList: {
        fontSize: 18,
        paddingLeft: '7%',
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
    buttonText: {
        paddingRight: '5%',
        paddingTop: '2%'
    },
    buttonAdd: {
        paddingBottom: '5%',
        alignSelf: 'flex-end',
        paddingEnd: '7%'
    },
    form: {
        paddingTop: '5%'
    },
    label: {
        fontSize: 20,
    },
    inputadd: {
        fontSize: 18,
        paddingRight: '5%',
        paddingLeft: '5%',
        borderRadius: 10,
        borderWidth: 1,
        marginRight: '5%',
        paddingTop: '2%'
    },
    labelinput: {
        paddingLeft: '5%',
        flexDirection: 'column',
        paddingBottom: '5%'
    },
    salvar: {
        backgroundColor: '#5d8aa8',
        borderRadius: 20,
        width: 120,
        height: 40,
        alignSelf: 'center',
        marginTop: '5%'
    },
    salvarText: {
        paddingTop: '5%',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
});