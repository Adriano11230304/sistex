import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import ReceberController from '../../controllers/ReceberController';
import { useAuth } from '../../store/auth';
import { atualizarHome, atualizarValoresReceitas, despTodosDados, receitasTodosDados, somatorioReceitas } from '../../controllers/utils/functions';
import { useState } from 'react';
import LoaderSimple from '../../components/LoaderSimple';


export default function AddReceitasRecebimento({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [ data, setData ] = useState();

    async function dataEscolhida(data){
        dispatch({ 'type': 'loading' });
        let item = await ReceberController.findById(route.params.paramskey);
        let data_recebimento = new Date(data.replace('/', '-').replace('/', '-')+'T00:00:00').getTime();
        const desp = await ReceberController.alterReceber(true, data_recebimento, item.id);
        await atualizarHome(state.selected, dispatch);
        await atualizarValoresReceitas(1, state.selectedReceitas, dispatch, false, false)
        ToastAndroid.show("Receita alterada com sucesso!", ToastAndroid.SHORT);
        dispatch({ 'type': 'loadingfalse' });
        navigation.navigate('ReceitaStack');
    }

    function voltar(){
        navigation.navigate('ReceitaStack');  
    }

    return (
        <SafeAreaView style={styles.container}>
            {state.loading ? (
                <>
                    <LoaderSimple/>
                </>
            ): (
                <>
                    <Header />
                    <View style={styles.title}>
                        <Text style={styles.text}>Escolha a data de recebimento</Text>
                    </View>
                    <DatePicker
                        mode='calendar'
                        onSelectedChange={
                            date => {
                                setData(date);
                            }
                        }
                    />

                    <View style={styles.buttonupdatevoltar}>
                        <TouchableOpacity style={styles.salvarUpdate}
                        onPress={async () => await dataEscolhida(data)}>
                            <Text style={styles.salvarTextUpdate}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.salvarUpdate2}
                        onPress={voltar}>
                            <Text style={styles.salvarTextUpdate}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                </>
            )}
            
        </SafeAreaView>
    );
}