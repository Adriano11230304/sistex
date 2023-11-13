import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import PagarController from '../../controllers/PagarController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SelectDropdown from 'react-native-select-dropdown';

export default function AddDespesas({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [parcelas, setParcelas] = useState(null);
    const [ fixa, setFixa ] = useState("Nao");
    const [ categoria_id, setCategoria_id ] = useState(null);
    const [ fornecedor_id, setFornecedor_id ] = useState(null);
    const [ fornecedor, setFornecedor ] = useState("Fornecedor ainda não escolhido")
    const [created_at, setCreated_at] = useState(null);
    const [data_entrada, setData_entrada] = useState("");
    const [pago, setPago] = useState("Nao");
    const [data_pagamento, setData_pagamento] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [modalVisiblePickerPagamento, setModalVisiblePickerPagamento] = useState(false);
    const [modalVisiblePickerFornecedor, setModalVisiblePickerFornecedor] = useState(false);
    const [ searchText, setSearchText ] = useState("");
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
        <SafeAreaView style={[styles.container, { opacity: modalVisiblePicker ? 0.5 : undefined }]}>
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
                        <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.label} onPress={() => setModalVisiblePicker(true)}>
                                    <Text style={styles.labelDate}>Data de entrada: {data_entrada}</Text>
                            </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisiblePicker}
                                    hardwareAccelerated={true}
                                >
                                <DatePicker
                                mode='calendar'
                                style={styles.datapicker}
                                    onSelectedChange={
                                        date => {
                                            setData_entrada(date)
                                            setModalVisiblePicker(false)
                                        }
                                    }
                                />
                                </Modal>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Fornecedor:</Text>
                                <TouchableOpacity onPress={() => setModalVisiblePickerFornecedor(true)}>
                                <Text style={styles.inputadd}>{fornecedor}</Text>
                                </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisiblePickerFornecedor}
                                    hardwareAccelerated={true}
                                >
                                    <SafeAreaView>
                                        <Header />
                                        <View style={styles.title}>
                                            <Text style={styles.text}>Escolhendo o Fornecedor</Text>
                                        </View>
                                        <View style={styles.searchArea}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Pesquise pelo fornecedor ou categoria"
                                                placeholderTextColor="#888"
                                                value={searchText}
                                                onChangeText={(t) => setSearchText(t)}
                                            />
                                            <FontAwesome name="search" size={24} color="black" />
                                        </View>
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerFornecedor(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                    </SafeAreaView>
                                </Modal>
                            
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Categoria:</Text>
                            
                        </View>
                            <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.label} onPress={() => setModalVisiblePickerPagamento(true)}>
                                    <Text style={styles.labelDate}>Data de pagamento: {data_pagamento}</Text>
                                </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisiblePickerPagamento}
                                    hardwareAccelerated={true}
                                >
                                    <DatePicker
                                        mode='calendar'
                                        style={styles.datapicker}
                                        onSelectedChange={
                                            date => {
                                                setData_pagamento(date)
                                                setModalVisiblePickerPagamento(false)
                                            }
                                        }
                                    />
                                </Modal>
                            </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.label}>Despesa Fixa:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={fixa}
                                data={["Sim", "Nao"]}
                                onSelect={(selectedItem, index) => { setFixa(selectedItem); }}
                            />
                        </View>
                            <View style={styles.labelinputFixa}>
                                <Text style={styles.label}>Despesa já está paga:</Text>
                                <SelectDropdown
                                    buttonStyle={styles.selectedFixa}
                                    defaultValue={pago}
                                    data={["Sim", "Nao"]}
                                    onSelect={(selectedItem, index) => { setFixa(selectedItem); }}
                                />
                            </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Observações:</Text>
                            <TextInput keyboardType='ascii-capable' style={styles.inputadd} value={observacoes} placeholderTextColor="#888" onChangeText={(t) => setObservacoes(t)}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.salvar} onPress={addPagar}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}