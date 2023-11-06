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
    textListPagar: {
        paddingLeft: '10%',
        width: 250,
        height: 65
    },
    itemList: {
        flex: 1,
        height: 40,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '1%',
        paddingLeft: '5%'
    },
    list: {
        flex: 1,
        flexDirection: 'row'
    },
});