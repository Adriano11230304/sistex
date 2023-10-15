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
        fontSize: 20,
        paddingLeft: '7%',
        fontWeight: 'bold',
        marginTop: '1%'
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#dcdcdc',
        margin: 30,
        borderRadius: 5,
        fontSize: 19,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#111111'
    },
    searchArea: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemList: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        height: 90,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    buttonText: {
        paddingRight: '5%',
        paddingTop: '4%'
    }
});