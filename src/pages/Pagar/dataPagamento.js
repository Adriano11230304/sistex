import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import PagarController from '../../controllers/PagarController';
import { useAuth } from '../../store/auth';
import { despTodosDados, somatorioDespesas, totalDespesasSeparadas } from '../../controllers/utils/functions';


export default function AddDespesasPagamento({ navigation, route }) {
    const { state, dispatch } = useAuth();
    async function dataEscolhida(date){
        let item = await PagarController.findById(route.params.paramskey);
        console.log(item);
        let data_pagamento = new Date(date.replace('/', '-').replace('/', '-')+'T00:00:00').getTime();
        const desp = await PagarController.alterPago(true, data_pagamento, item.id);
        const dateNow = Date.now();
        const dataatual = new Date(dateNow).toLocaleString().substring(3, 10);
        const datainicio = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-31T00:00:00").getTime();

        const datainicioHome = new Date(state.selected.substring(3, 8) + "-" + state.selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafimHome = new Date(state.selected.substring(3, 8) + "-" + state.selected.substring(0, 2) + "-31T00:00:00").getTime();
        const despesastot = await PagarController.listAllNoPage(datainicioHome, datafimHome);
        const totDespesas = totalDespesasSeparadas(despesastot);
        console.log(totDespesas);
        
        /*dispatch({
            "type": "valorTotalDespesasNoPage",
            "valorTotalDespesasNoPage": totDespesas
        })*/

        if (route.params.prefix == 'fixa'){
            const despesas = await PagarController.listAllFixas(1, datainicio, datafim);
            const action = {
                "type": "atualizarDespesasFixas",
                "despesasFixas": await despTodosDados(despesas)
            }
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch(action);
            navigation.navigate('PagarFixaStack');
        } else if (route.params.prefix == 'variavel'){
            const despesas = await PagarController.listAllVariaveis(1, datainicio, datafim);
            const action = {
                "type": "atualizarDespesasVariaveis",
                "despesasVariaveis": await despTodosDados(despesas)
            }
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch(action);
            navigation.navigate('PagarVariavelStack');
        } else if (route.params.prefix == 'index'){
            const despesas = await PagarController.listAll(1, datainicio, datafim);
            const action = {
                "type": "atualizarDespesas",
                "despesas": await despTodosDados(despesas)
            }
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch(action);
            navigation.navigate('PagarStack');
        }
        
    }

    function voltar(){
        if (route.params.prefix == 'fixa') {
            navigation.navigate('PagarFixaStack');
        } else if (route.params.prefix == 'variavel') {
            navigation.navigate('PagarVariavelStack');
        } else if (route.params.prefix == 'index') {
            navigation.navigate('PagarStack');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Escolha a data de pagamento</Text>
            </View>
            <DatePicker
                mode='calendar'
                onSelectedChange={
                    async date => {
                        await dataEscolhida(date);
                    }
                }
            />

            <TouchableOpacity style={styles.modalSalvar}
                onPress={voltar}>
                <Text style={styles.salvarText}>Voltar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}