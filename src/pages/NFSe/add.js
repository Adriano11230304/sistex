import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import CategoriaController from '../../controllers/CategoriaController';
import ClienteController from '../../controllers/ClienteController';
import NfseController from '../../controllers/NfseController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { categoriaValidate } from '../../controllers/utils/validators';
import { SeparatorItem } from '../../components/SeparatorItem';
import Vazio from '../../components/Vazio';

export default function AddNfse({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [descricao, setDescricao] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [valor, setValor] = useState(null);
    const [modalVisiblePickerCliente, setModalVisiblePickerCliente] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [clientes, setClientes] = useState(null);
    const [cliente_id, setCliente_id] = useState(null);

    const [loading, setLoading] = useState(false);

    async function searchCliente() {
        setClientes(await ClienteController.findNameorEmail(searchText, 25));
    }

    useEffect(() => {
        loadClientes();
    }, [])

    async function loadClientes() {
        setClientes(await ClienteController.listAll(1));
    }

    const addNfse = async () => {
        setLoading(true);
        const teste = {
            "isValid": true
        }
        if (teste.isValid) {
            const nfse = await NfseController.add(cliente_id, descricao, valor);
            ToastAndroid.show("Nfse adicionada com sucesso!", ToastAndroid.SHORT);
            const cats = await NfseController.listAll(1);
            console.log(cats);
            const action = {
                "type": "atualizarNfse",
                "nfse": await NfseController.listAll(1)
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('NfseStack', '1');
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }

    }
    
    async function setaCliente_id(id) {
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
                        <Text style={styles.text}>Adicionar uma nova Nfse</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Descrição:</Text>
                            <TextInput style={styles.inputadd} value={descricao} placeholder='Adicione a descrição' placeholderTextColor="#888" onChangeText={(t) => setDescricao(t)}></TextInput>
                        </View>
                            <View style={styles.labelinput}>
                                <Text style={styles.label}>Valor:</Text>
                                <TextInput keyboardType='numeric' style={styles.inputadd} value={valor} placeholderTextColor="#888" onChangeText={(t) => setValor(t)}></TextInput>
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

                        <TouchableOpacity style={styles.salvar} onPress={addNfse}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </SafeAreaView>
    )
};