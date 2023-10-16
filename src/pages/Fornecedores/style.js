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
        margin: 15,
        borderRadius: 10,
        fontSize: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#111111'
    },
    searchArea: {
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
        paddingBottom: '10%',
        alignSelf: 'flex-end',
        paddingEnd: '10%'
    }
});