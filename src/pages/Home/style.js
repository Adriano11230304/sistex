import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textHome: {
        paddingLeft: '5%',
        fontSize: 23,
        backgroundColor: '#5d8aa8',
        color: '#fff',
        fontWeight: 'bold',
        paddingBottom: '5%'

    },
    button: {
        backgroundColor: 'gray',
        width: 90,
        height: 45,
        marginTop: 15,
        alignItems: 'center',
        paddingTop: 10
    },
    contas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '10%',
        paddingEnd: '10%',
        paddingTop: '5%',
    },
    contasPagar: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red'
    },
    contasReceber: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'green'
    },
    viewPagar: {
        alignItems: 'center'
    },
    viewReceber: {
        alignItems: 'center'
    },
    valorPagar:{
        fontSize: 20
    },
    valorReceber:{
        fontSize: 20
    },
    select: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5%'
    },
    grafico: {
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: '5%',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
    },
    graficoText: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 100
    }
});

