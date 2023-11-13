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
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red'
    },
    contasReceber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green'
    },
    contasReceber: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green'
    },
    viewdespesas: {
        flexDirection: 'row'
    },  
    contasPagarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    contasReceberTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green'
    },
    valorPagar:{
        fontSize: 15,
        paddingLeft: '5%'

    },
    valorReceber:{
        fontSize: 15,
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
    },
    balanco: {
        paddingLeft: '5%',
        paddingTop: '5%',
        paddingBottom: '5%'
    },
    balancoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    }
});

