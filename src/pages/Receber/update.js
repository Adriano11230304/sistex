import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import ClienteController from '../../controllers/ClienteController';
import ReceberController from '../../controllers/ReceberController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SelectDropdown from 'react-native-select-dropdown';
import Vazio from '../../components/Vazio';
import { SeparatorItem } from '../../components/SeparatorItem';
import { receberValidate } from '../../controllers/utils/validators';
import { atualizarHome, atualizarValoresReceitas } from '../../controllers/utils/functions';

export default function UpdateReceita({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [parcelas, setParcelas] = useState(1);
    const [ cliente_id, setCliente_id ] = useState(null);
    const [ cliente, setCliente ] = useState("Cliente não escolhido")
    const [data_entrada, setData_entrada] = useState("Não escolhida");
    const [recebida, setRecebida] = useState(false);
    const [data_recebimento, setData_recebimento] = useState("Não escolhida");
    const [data_vencimento, setData_vencimento] = useState("Não escolhida");
    const [forma_recebimento, setForma_recebimento] = useState("pix");
    const [loading, setLoading] = useState(false);
    const [modalVisiblePicker, setModalVisiblePicker] = useState(false);
    const [modalVisiblePickerRecebimento, setModalVisiblePickerRecebimento] = useState(false);
    const [modalVisiblePickerVencimento, setModalVisiblePickerVencimento] = useState(false);
    const [modalVisiblePickerCliente, setModalVisiblePickerCliente] = useState(false);
    const [ searchText, setSearchText ] = useState("");
    const [ clientes, setClientes ] = useState(null);

    useEffect(() => {
        atualizarReceita();
    }, [])


    async function atualizarReceita(){
        const rec = await ReceberController.findById(route.params.key);
        setValor(''+rec.valor);
        setData_entrada(new Date(rec.data_entrada).toISOString().substring(0, 10).replace("-", "/").replace("-", "/"));
        rec.data_vencimento ? setData_vencimento(new Date(rec.data_vencimento).toISOString().substring(0, 10).replace("-", "/").replace("-", "/")) : null;
        if(rec.recebida){
            setData_recebimento(new Date(rec.data_recebimento).toISOString().substring(0, 10).replace("-", "/").replace("-", "/"));
        }
        setCliente_id(rec.cliente_id);
        await setaCliente_id(rec.cliente_id);
        setRecebida(rec.recebida);
        setObservacoes(rec.observacoes);
        setForma_recebimento(rec.forma_recebimento);
    }

    async function searchCliente(){
        setClientes(await ClienteController.findNameorEmail(searchText, 25));
    }

    const atualizarReceber = async () => {
        setLoading(true);
        const rec = await ReceberController.findById(route.params.key);
        const dataEntradaFormatada = new Date(data_entrada.replace("/", "-").replace("/", "-") + "T00:00:00").getTime();
        let dataRecebimentoFormatada;
        let dataVencimento = data_vencimento ? new Date(data_vencimento.replace("/", "-").replace("/", "-") + "T00:00:00").getTime() : null;
        if(recebida){
            dataRecebimentoFormatada = new Date(data_recebimento.replace("/", "-").replace("/", "-") + "T00:00:00").getTime();
        }else{
            dataRecebimentoFormatada = null;
        }
        
        const validatereceber = {
            "valor": valor,
            "parcelas": 1,
            "cliente_id": cliente_id,
            "data_entrada": dataEntradaFormatada,
            "recebida": recebida,
            "forma_recebimento": forma_recebimento
        }

        const teste = await receberValidate(validatereceber);
        if (teste.isValid) {
            const date = Date.now();
            let parc = parcelas;
            rec.valor = valor;
            rec.data_entrada = dataEntradaFormatada;
            rec.observacoes = observacoes;
            rec.recebida = recebida;
            rec.data_recebimento = dataRecebimentoFormatada
            rec.data_vencimento = dataVencimento;
            rec.cliente_id = cliente_id;
            rec.forma_recebimento = forma_recebimento;
            const receita = await ReceberController.update(rec);

            await atualizarHome(state.selected, dispatch);
            await atualizarValoresReceitas(1, state.selectedReceitas, dispatch, false, false);
            ToastAndroid.show("Receita alterada com sucesso!", ToastAndroid.SHORT);
            setLoading(false);
            navigation.navigate('ReceitaStack');
            
            
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }

        setLoading(false);

    }

    async function setaCliente_id(id){
        setCliente_id(id);
        const cli = await ClienteController.findById(id);
        setCliente(cli.name)
        setModalVisiblePickerCliente(false);
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => setaCliente_id(item.id)} style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.name}</Text>
                    <Text style={styles.textList}>{item.cnpj}</Text>
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
                        <Text style={styles.text}>Atualizar receita</Text>
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
                            <Text style={styles.labelAdd}>Cliente:</Text>
                                <TouchableOpacity onPress={() => setModalVisiblePickerCliente(true)}>
                                <Text style={styles.inputadd}>{cliente}</Text>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={modalVisiblePickerCliente}
                                    hardwareAccelerated={true}
                                >
                                    <SafeAreaView>
                                        <View style={styles.title}>
                                            <Text style={styles.text}>Escolha um Cliente</Text>
                                        </View>
                                        <View style={styles.searchArea}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Pesquise pelo cliente ou forma de recebimento"
                                                placeholderTextColor="#888"
                                                value={searchText}
                                                onChangeText={(t) => setSearchText(t)}
                                            />
                                            <TouchableOpacity onPress={searchCliente}>
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
                                                    data={clientes}
                                                    ListEmptyComponent={<Vazio text={"Nenhum cliente encontrado!"} />}
                                                    renderItem={({ item }) => <Item item={item} />}
                                                    keyExtractor={(item) => item.id}

                                                />
                                            </>
                                        )}
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerCliente(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                    </SafeAreaView>
                                </Modal>
                            
                        </View>
                            <View style={styles.labelinputdate}>
                                <TouchableOpacity style={styles.labelAdd} onPress={() => setModalVisiblePickerRecebimento(true)}>
                                    <Text style={styles.labelDate}>Data de recebimento: {data_recebimento}</Text>
                                </TouchableOpacity>
                                <Modal
                                    statusBarTranslucent={true}
                                    animationType="fade"
                                    transparent={false}
                                    visible={modalVisiblePickerRecebimento}
                                    hardwareAccelerated={true}
                                >
                                    <DatePicker
                                        mode='calendar'
                                        style={styles.datapicker}
                                        onSelectedChange={
                                            date => {
                                                setData_recebimento(date)
                                                setModalVisiblePickerRecebimento(false)
                                            }
                                        }
                                    />
                                    <TouchableOpacity style={styles.modalSalvar}
                                        onPress={() => setModalVisiblePickerRecebimento(false)}>
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
                                        onPress={() => setModalVisiblePickerRecebimento(false)}>
                                        <Text style={styles.salvarText}>Voltar</Text>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.labelAdd}>Receita já foi recebida:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={"Nao"}
                                data={["Sim", "Nao"]}
                                onSelect={(selectedItem, index) => { 
                                    if(selectedItem == 'Nao'){
                                        setRecebida(false);
                                    }else{
                                        setRecebida(true);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.labelinputFixa}>
                            <Text style={styles.labelAdd}>Forma de Recebimento:</Text>
                            <SelectDropdown
                                buttonStyle={styles.selectedFixa}
                                defaultValue={forma_recebimento}
                                data={["crédito", "pix", "debito"]}
                                onSelect={(selectedItem, index) => { setForma_recebimento(selectedItem); }}
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
                        <TouchableOpacity style={styles.salvar} onPress={atualizarReceber}>
                            <Text style={styles.salvarText}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}