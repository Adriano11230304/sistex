import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 23,
        backgroundColor: '#5d8aa8',
        color: '#fff',
        fontWeight: 'bold',
    },
    title: {
        backgroundColor: '#5d8aa8',
        paddingBottom: '5%',
        alignItems: 'center'
    },
    grafico: {
        alignContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
    },
    graficoText: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 100
    },
    balancoText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    selected: {
        borderRadius: 28,
        height: 30,
        width: 120,
        paddingTop: 2
    },
    select: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5%',
        borderRadius: 50
    },
});