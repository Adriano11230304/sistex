import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import PagarController from '../../controllers/PagarController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import DatePicker from "react-native-modern-datepicker";

export default function AddDespesas({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [parcelas, setParcelas] = useState(null);
    const [ fixa, setFixa ] = useState(null);
    const [ categoria_id, setCategoria_id ] = useState(null);
    const [ fornecedor_id, setFornecedor_id ] = useState(null);
    const [created_at, setCreated_at] = useState(null);
    const [data_entrada, setData_entrada] = useState(null);
    const [pago, setPago] = useState(null);
    const [data_pagamento, setData_pagamento] = useState(null);
    const [loading, setLoading] = useState(false);

    const addPagar = async () => {
        setLoading(true);
        
        /*const validatedesp = {
            "name": nome,
            "email": email
        }*/
        const teste = {
            "isValid": true
        }
        if (teste.isValid) {
            setValor(3.56);
            setParcelas(0);
            setObservacoes("");
            setFixa(true);
            setCategoria_id(2);
            setFornecedor_id(1);
            setCreated_at(Date.now().getTime());
            setData_entrada(new Date('2023-11-13T00:00:00').getTime());
            setData_pagamento(new Date('2023-11-23T00:00:00').getTime());
            setPago(false);
            // const desp = await PagarController.add(valor, observacoes, parcelas, fixa, categoria_id, fornecedor_id, created_at, data_entrada, pago, data_pagamento);
            // ToastAndroid.show("Despesa adicionada com sucesso!", ToastAndroid.SHORT);
            const action = {
                "type": "atualizarDespesas",
                "despesas": await PagarController.listAll(1)
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('PagarStack', '1');
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <>
                    <LoaderSimple />
                </>
            ) : (
                <>
                    <Header />
                    <View style={styles.title}>
                        <Text style={styles.text}>Adicionar uma nova despesa</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Valor:</Text>
                            <TextInput keyboardType='numeric' style={styles.inputadd} value={valor} placeholderTextColor="#888" onChangeText={(t) => setValor(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Data de entrada:</Text>
                            {/* Fazer um modal para abrir o DatePicker*/}
                                <DatePicker
                                    onSelectedChange={date => setData_entrada(date)}
                                />
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Fornecedor:</Text>
                            
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Categoria:</Text>
                            
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Data de pagamento:</Text>
                                <TextInput keyboardType='numeric' style={styles.inputadd} value={data_pagamento} placeholderTextColor="#888" onChangeText={(t) => setData_pagamento(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Despesa Fixa:</Text>
                            
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Despesa já está paga:</Text>

                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Observações:</Text>
                            <TextInput keyboardType='numeric' style={styles.inputadd} value={observacoes} placeholderTextColor="#888" onChangeText={(t) => setObservacoes(t)}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.salvar} onPress={addPagar}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                        {/*<Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                            >
                                <View style={styles.modalCenteredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalTitle}>Erros:</Text>
                                        <FlatList 
                                            showsVerticalScrollIndicator={false}
                                            data={errors}
                                            renderItem={({ item }) =>
                                                <View>
                                                    <View>
                                                        <Text style={styles.modalText}>{item}</Text>
                                                    </View>
                                                </View>
                                            }
                                        />
                                        <TouchableOpacity style={styles.modalSalvar}
                                            onPress={() => setModalVisible(false)}>
                                            <Text style={styles.salvarText}>Voltar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                        </Modal>*/}
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}