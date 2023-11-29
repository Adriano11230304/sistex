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
import Vazio from '../../components/Vazio';
import { SeparatorItem } from '../../components/SeparatorItem';
import CategoriaController from '../../controllers/CategoriaController';
import { pagarValidate } from '../../controllers/utils/validators';
import { despTodosDados, somatorioDespesas, totalDespesasSeparadas } from '../../controllers/utils/functions';

export default function AddDespesas({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [parcelas, setParcelas] = useState(1);
    const [ fixa, setFixa ] = useState(false);
    const [ categoria_id, setCategoria_id ] = useState(null);
    const [ fornecedor_id, setFornecedor_id ] = useState(null);
    const [ fornecedor, setFornecedor ] = useState("Fornecedor não escolhido")
    const [ categoria, setCategoria ] = useState("Categoria não escolhida");
    const [data_entrada, setData_entrada] = useState("Não escolhida");
    const [pago, setPago] = useState(false);
    const [data_pagamento, setData_pagamento] = useState("Não escolhida");
    const [data_vencimento, setData_vencimento] = useState("Não escolhida");
    const [forma_pagamento, setForma_pagamento] = useState("pix");
    const [loading, setLoading] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [modalVisiblePickerPagamento, setModalVisiblePickerPagamento] = useState(false);
    const [modalVisiblePickerVencimento, setModalVisiblePickerVencimento] = useState(false);
    const [modalVisiblePickerFornecedor, setModalVisiblePickerFornecedor] = useState(false);
    const [modalVisiblePickerCategoria, setModalVisiblePickerCategoria ] = useState(false);
    const [ searchText, setSearchText ] = useState("");
    const [searchTextCategoria, setSearchTextCategoria] = useState("");
    const [ categorias, setCategorias ] = useState(null);
    const [ fornecedores, setFornecedores ] = useState(null);

    async function searchFornecedor(){
        setFornecedores(await FornecedorController.findNameorEmail(searchText, 25));
    }

    useEffect(() => {
        searchCategoria();
    }, [])

    async function searchCategoria(){
        setCategorias(await CategoriaController.findTitulo(searchTextCategoria, 20));
    }

    const addPagar = async () => {
        setLoading(true);
        const dataEntradaFormatada = new Date(data_entrada.replace("/", "-").replace("/", "-") + "T00:00:00").getTime();
        let dataPagamentoFormatada;
        let dataVencimento = data_vencimento ? dataVencimento = new Date(data_vencimento.replace("/", "-").replace("/", "-") + "T00:00:00").getTime(): null;
        if(pago){
            dataPagamentoFormatada = new Date(data_pagamento.replace("/", "-").replace("/", "-") + "T00:00:00").getTime();
        }else{
            dataPagamentoFormatada = null;
        }
        
        const validatedesp = {
            "valor": valor,
            "parcelas": parcelas,
            "fixa": fixa,
            "categoria_id": categoria_id,
            "fornecedor_id": fornecedor_id,
            "data_entrada": dataEntradaFormatada,
            "pago": pago,
            "forma_pagamento": forma_pagamento
        }

        const teste = await pagarValidate(validatedesp);
        if (teste.isValid) {
            const date = Date.now();
            let parc = parcelas;
            while(parc > 0){
                let mes = new Date(dataEntradaFormatada).getMonth() + parc;
                let ano = new Date(dataEntradaFormatada).getFullYear();
                if(mes > 12){
                    mes = mes - 12
                    ano++;
                }
                mes = mes < 10 ? "0"+mes : mes;
                console.log("data_vencimento", dataVencimento, data_vencimento);
                if(parc > 1){
                    let data = new Date(ano + "-" + mes + "-01T00:00:00").getTime();
                    const desp = await PagarController.add(valor, obs, parc, fixa, categoria_id, fornecedor_id, date, data, false, null, forma_pagamento, true, dataVencimento);
                }else{
                    const desp = await PagarController.add(valor, observacoes, parc, fixa, categoria_id, fornecedor_id, date, dataEntradaFormatada, pago, dataPagamentoFormatada, forma_pagamento, false, dataVencimento);
                }
                
                parc--;
            }

            const dataatual = new Date(date).toLocaleString().substring(3, 10);
            const datainicio = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-01T00:00:00").getTime();
            const datafim = new Date(dataatual.substring(3, 8) + "-" + dataatual.substring(0, 2) + "-31T00:00:00").getTime();
                const despesasFixas = await PagarController.listAllFixas(1, datainicio, datafim);
                const actionFixas = {
                    "type": "atualizarDespesasFixas",
                    "despesasFixas": await despTodosDados(despesasFixas),
                    "valorTotalFixas": somatorioDespesas(despesasFixas)
                }
                dispatch(actionFixas);
          
                const despesasVariaveis = await PagarController.listAllVariaveis(1, datainicio, datafim);
                const actionVariaveis = {
                    "type": "atualizarDespesasVariaveis",
                    "despesasVariaveis": await despTodosDados(despesasVariaveis),
                    "valorTotalVariaveis": somatorioDespesas(despesasVariaveis)
                }
                dispatch(actionVariaveis);
           
                const despesas = await PagarController.listAll(1, datainicio, datafim);
                const despesastot = await PagarController.listAllNoPage(datainicio, datafim);
                const totDespesas = totalDespesasSeparadas(despesastot);
                const action = {
                    "type": "atualizarDespesas",
                    "despesas": await despTodosDados(despesas),
                    "valorTotal": somatorioDespesas(despesas),
                    "valorTotalDespesasNoPage": totDespesas
                }
                dispatch(action);
                ToastAndroid.show("Despesa adicionada com sucesso!", ToastAndroid.SHORT);
                setLoading(false);
                if(route.params.prefix == 'variavel'){
                    navigation.navigate('PagarFixaStack');
                }else if(route.params.prefix == 'variavel'){
                    navigation.navigate('PagarVariavelStack');
                }else{
                    navigation.navigate('PagarStack');
                }
                
            
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }

        setLoading(false);

    }

    async function setaFornecedor_id(id){
        setFornecedor_id(id);
        const forn = await FornecedorController.findById(id);
        setFornecedor(forn.name)
        setModalVisiblePickerFornecedor(false);
    }

    async function setaCategoria_id(id) {
        setCategoria_id(id);
        const cat = await CategoriaController.findById(id);
        setCategoria(cat.titulo)
        setModalVisiblePickerCategoria(false);
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => setaFornecedor_id(item.id)} style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.name}</Text>
                    <Text style={styles.textList}>{item.cnpj}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const ItemCategoria = ({ item }) => (
        <TouchableOpacity onPress={() => setaCategoria_id(item.id)} style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.titulo}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    

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
                        <View style={styles.labelinputValor}>
                            <Text style={styles.labelAddValor}>Valor:</Text>
                            <TextInput keyboardType='numeric' style={styles.inputaddvalorv} value={valor} placeholderTextColor="#888" onChangeText={(t) => setValor(t)}></TextInput>
                        </View>
                        <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.labelAdd} onPress={() => setModalVisiblePicker(true)}>
                                    <Text style={styles.labelDate}>Data de entrada: {data_entrada}</Text>
                            </TouchableOpacity>
                                <Modal
                                    style={styles.modalDataEntrada}
                                    animationType="slide"
                                    transparent={false}
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
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePicker(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                </Modal>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.labelAdd}>Fornecedor:</Text>
                                <TouchableOpacity onPress={() => setModalVisiblePickerFornecedor(true)}>
                                <Text style={styles.inputadd}>{fornecedor}</Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={modalVisiblePickerFornecedor}
                                    hardwareAccelerated={true}
                                >
                                    <SafeAreaView>
                                        <View style={styles.title}>
                                            <Text style={styles.text}>Escolha um Fornecedor</Text>
                                        </View>
                                        <View style={styles.searchArea}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Pesquise pelo fornecedor ou categoria"
                                                placeholderTextColor="#888"
                                                value={searchText}
                                                onChangeText={(t) => setSearchText(t)}
                                            />
                                            <TouchableOpacity onPress={searchFornecedor}>
                                            <FontAwesome name="search" size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        {state.loading ? (
                                            <>
                                                <LoaderSimple />
                                            </>
                                        ) : (
                                            <>
                                                <FlatList
                                                    ItemSeparatorComponent={SeparatorItem}
                                                    initialNumToRender={50}
                                                    maxToRenderPerBatch={50}
                                                    showsVerticalScrollIndicator={false}
                                                    data={fornecedores}
                                                    ListEmptyComponent={<Vazio text={"Nenhum fornecedor encontrado!"} />}
                                                    renderItem={({ item }) => <Item item={item} />}
                                                    keyExtractor={(item) => item.id}

                                                />
                                            </>
                                        )}
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerFornecedor(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                    </SafeAreaView>
                                </Modal>
                            
                        </View>
                        <View style={styles.labelinput}>
                                <Text style={styles.labelAdd}>Categoria: </Text>
                                <TouchableOpacity onPress={() => setModalVisiblePickerCategoria(true)}>
                                    <Text style={styles.inputadd}>{categoria}</Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={modalVisiblePickerCategoria}
                                    hardwareAccelerated={true}
                                >
                                    <SafeAreaView>
                                        <View style={styles.title}>
                                            <Text style={styles.text}>Escolha uma Categoria</Text>
                                        </View>
                                        <View style={styles.searchArea}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Pesquise pela categoria"
                                                placeholderTextColor="#888"
                                                value={searchTextCategoria}
                                                onChangeText={(t) => setSearchTextCategoria(t)}
                                            />
                                            <TouchableOpacity onPress={searchCategoria}>
                                                <FontAwesome name="search" size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        {state.loading ? (
                                            <>
                                                <LoaderSimple />
                                            </>
                                        ) : (
                                            <>
                                                <FlatList
                                                    ItemSeparatorComponent={SeparatorItem}
                                                    initialNumToRender={50}
                                                    maxToRenderPerBatch={50}
                                                    showsVerticalScrollIndicator={false}
                                                    data={categorias}
                                                    ListEmptyComponent={<Vazio text={"Nenhum categoria encontrado!"} />}
                                                    renderItem={({ item }) => <ItemCategoria item={item} />}
                                                    keyExtractor={(item) => item.id}
                                                />
                                            </>
                                        )}
                                        <TouchableOpacity style={styles.modalSalvar}
                                            onPress={() => setModalVisiblePickerCategoria(false)}>
                                            <Text style={styles.salvarText}>Voltar</Text>
                                        </TouchableOpacity>
                                    </SafeAreaView>
                                </Modal>
                        </View>
                            <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.labelAdd} onPress={() => setModalVisiblePickerPagamento(true)}>
                                    <Text style={styles.labelDate}>Data de pagamento: {data_pagamento}</Text>
                                </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={false}
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
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerPagamento(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                            <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.labelAdd} onPress={() => setModalVisiblePickerVencimento(true)}>
                                    <Text style={styles.labelDate}>Data de vencimento: {data_vencimento}</Text>
                                </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={false}
                                    visible={modalVisiblePickerVencimento}
                                    hardwareAccelerated={true}
                                >
                                    <DatePicker
                                        mode='calendar'
                                        style={styles.datapicker}
                                        onSelectedChange={
                                            date => {
                                                setData_vencimento(date)
                                                setModalVisiblePickerVencimento(false)
                                            }
                                        }
                                    />
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerPagamento(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.labelAdd}>Despesa Fixa:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={"Nao"}
                                data={["Sim", "Nao"]}
                                onSelect={(selectedItem, index) => { 
                                    if(selectedItem == 'Nao'){
                                        setFixa(false);
                                    }else{
                                        setFixa(true);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.labelAdd}>Despesa já está paga:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={"Nao"}
                                data={["Sim", "Nao"]}
                                onSelect={(selectedItem, index) => { 
                                    if(selectedItem == 'Nao'){
                                        setPago(false);
                                    }else{
                                        setPago(true);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.labelAdd}>Forma de Pagamento:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={forma_pagamento}
                                data={["crédito", "pix", "debito"]}
                                onSelect={(selectedItem, index) => { setForma_pagamento(selectedItem); }}
                            />
                        </View>
                            <View style={styles.labelinputFixa}>
                                <Text style={styles.labelAdd}>Parcelas:</Text>
                                <SelectDropdown
                                    buttonStyle={styles.selectedFixa}
                                    defaultValue={parcelas}
                                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                                    onSelect={(selectedItem, index) => { setParcelas(selectedItem); }}
                                />
                            </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.labelAdd}>Observações:</Text>
                                <TextInput keyboardType='ascii-capable' style={styles.inputaddobserv} value={observacoes} placeholderTextColor="#888" onChangeText={(t) => setObservacoes(t)}></TextInput>
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