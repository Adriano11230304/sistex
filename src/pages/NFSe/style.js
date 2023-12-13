import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 28,
        marginLeft: '10%'
    },
    itemList: {
        flex: 1,
        height: 60,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderBottomColor: 'gray'
    },
    textListPagar: {
        flex: 1,
        paddingLeft: '5%',
        flexDirection: 'row',
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
    textList: {
        fontSize: 16,
        textAlign: 'justify',
        marginTop: '1%',
        paddingLeft: '5%'
    },
    list: {
        flex: 1,
        flexDirection: 'row'
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
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#dcdcdc',
        fontSize: 15,
        color: '#111111'
    },
    buttonText: {
        paddingRight: '5%',
        paddingTop: '2%',
        paddingLeft: '3%'
    },
    buttonAdd: {
        paddingBottom: '3%',
        alignSelf: 'flex-end',
        paddingEnd: '7%'
    },
    buttons: {
        flexDirection: 'row-reverse'
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
    visualizarPagarText: {
        fontSize: 20,
        paddingTop: '3%',
        fontWeight: 'bold'
    },
    visualizarPagar: {
        flexDirection: 'column',
        paddingTop: '5%',
        paddingLeft: '5%'

    },
    salvarUpdate3: {
        backgroundColor: 'gray',
        borderRadius: 20,
        width: 130,
        height: 40,
        alignSelf: 'center',
        marginTop: '10%',
        marginLeft: '5%'
    },
    salvarTextUpdate: {
        paddingTop: '5%',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});
