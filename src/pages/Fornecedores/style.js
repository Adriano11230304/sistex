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
    text:{
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
        borderBottomWidth: 1,
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
    salvarUpdate: {
        backgroundColor: '#5d8aa8',
        borderRadius: 20,
        width: 130,
        height: 40,
        alignSelf: 'center',
        marginTop: '5%',
    },
    salvarUpdate2: {
        backgroundColor: 'gray',
        borderRadius: 20,
        width: 130,
        height: 40,
        alignSelf: 'center',
        marginTop: '5%',
        marginLeft: '5%'
    },
    salvarText: {
        paddingTop: '5%',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    salvarTextUpdate: {
        paddingTop: '5%',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonupdatevoltar: {
        flexDirection: 'row',
        alignSelf: 'center',
    },

    /*modalCenteredView: {
        position: 'absolute',
        flex: 1,
        paddingTop: 270,
        paddingLeft: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#D3D3D3',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText:{
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 15,
    },
    viewTextModal: {
        
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center',
    },
    modalSalvar:{
        backgroundColor: '#5d8aa8',
        borderRadius: 20,
        width: 120,
        height: 40,
        alignSelf: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    }*/
});