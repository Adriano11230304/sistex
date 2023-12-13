import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import DatePicker from "react-native-modern-datepicker";
import PagarController from '../../controllers/PagarController';
import { useAuth } from '../../store/auth';
import { atualizarHome, atualizarValoresDespesas } from '../../controllers/utils/functions';
import { useState } from 'react';
import LoaderSimple from '../../components/LoaderSimple';


export default function AddDespesasPagamento({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [ data, setData ] = useState("");
    
    async function dataEscolhida(data){
        dispatch({ 'type': 'loading' });
        let item = await PagarController.findById(route.params.paramskey);
        let data_pagamento = new Date(data.replace('/', '-').replace('/', '-')+'T00:00:00').getTime();
        const desp = await PagarController.alterPago(true, data_pagamento, item.id);
        await atualizarHome(state.selected, dispatch);

        if (route.params.prefix == 'fixa'){
            await atualizarValoresDespesas(1, state.selectedDespesasf, dispatch, false, false);
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch({ 'type': 'loadingfalse' })
            navigation.navigate('PagarFixaStack');
        } else if (route.params.prefix == 'variavel'){
            await atualizarValoresDespesas(1, state.selectedDespesasv, dispatch, false, false);
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch({ 'type': 'loadingfalse' })
            navigation.navigate('PagarVariavelStack');
        } else if (route.params.prefix == 'index'){
            await atualizarValoresDespesas(1, state.selectedDespesas, dispatch, false, false);
            ToastAndroid.show("Despesa alterada com sucesso!", ToastAndroid.SHORT);
            dispatch({ 'type': 'loadingfalse' })
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
            {state.loading ? (
                <>
                    <LoaderSimple />    
                </>
            ) : (
                <>
                    <Header />
                    <View style={styles.title}>
                        <Text style={styles.text}>Escolha a data de pagamento</Text>
                    </View>
                    <DatePicker
                        mode='calendar'
                        onSelectedChange={
                            date => {
                                setData(date)
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
            )    
        }
            
        </SafeAreaView>
    );
}