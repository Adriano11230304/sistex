import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import ReceberController from '../../controllers/ReceberController';
import { useAuth } from '../../store/auth';
import { despTodosDados, receitasTodosDados, somatorioReceitas } from '../../controllers/utils/functions';


export default function AddReceitasRecebimento({ navigation, route }) {
    const { state, dispatch } = useAuth();
    async function dataEscolhida(date){
        let item = await ReceberController.findById(route.params.paramskey);
        console.log(item);
        let data_recebimento = new Date(date.replace('/', '-').replace('/', '-')+'T00:00:00').getTime();
        console.log(data_recebimento);
        const desp = await ReceberController.alterReceber(true, data_recebimento, item.id);
        const dateNow = Date.now();
        const dataatual = new Date(dateNow).toLocaleString().substring(3, 10);
        const datainicio = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-31T00:00:00").getTime();
        const receitas = await ReceberController.listAll(1, datainicio, datafim);
        const action = {
            "type": "atualizarReceitas",
            "receitas": await receitasTodosDados(receitas),
            "valorTotalReceitas": somatorioReceitas(receitas)
        }
        ToastAndroid.show("Receita alterada com sucesso!", ToastAndroid.SHORT);
        dispatch(action);
        navigation.navigate('ReceitaStack');
    }

    function voltar(){
        navigation.navigate('ReceitaStack');  
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Escolha a data de recebimento</Text>
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