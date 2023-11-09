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
        marginTop: '5%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderRadius: 30,
        height: 45,
        width: 125,
    },
    textCategoria: {
        fontSize: 12,
        alignSelf: 'center',
        verticalAlign: 'middle'
    },  
    buttonText: {
        paddingRight: '5%',
        paddingTop: '2%'
    },
    textListPagar:{
        paddingLeft: '5%',
        width: 250,
        height: 65
    },
    image: {
        width: 12,
        height: 12,
        marginLeft: 7
    },
    select: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: '1%',
    },
    checkbox: {
        flexDirection: 'row',
        marginTop: 5,
        marginRight: 5
    },
    checkboxs: {
        width: 200,
        flexDirection: 'row'
    },
    selectHome:{
        paddingTop: '7%',
        paddingLeft: '5%'
    },
    checkbox3: {
        marginLeft: 35
    },
    checkbox2: {
        marginLeft: 6
    },
    checkbox1: {
        marginLeft: 41
    },
    checkbox4: {
        marginLeft: 16
    },
    selected: {
        borderRadius: 28,
        height: 30,
        width: 120,
        paddingTop: 2
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
    buttons: {
        flexDirection: 'row-reverse'
    },
    pagesNext: {
        flexDirection: 'row',
        paddingBottom: '3%',
        paddingRight: '40%'
    },
    buttonAdd: {
        paddingBottom: '3%',
        alignSelf: 'flex-end',
        paddingEnd: '7%'
    },
});