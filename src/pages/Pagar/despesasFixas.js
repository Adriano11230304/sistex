import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import PagarController from '../../controllers/PagarController';
import FornecedorController from '../../controllers/FornecedorController';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { useAuth } from '../../store/auth';
import { SeparatorItem } from '../../components/SeparatorItem';
import Checkbox from 'expo-checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import CategoriaController from '../../controllers/CategoriaController';
import Vazio from '../../components/Vazio';




export default function ContasPagarFixas({ navigation, route }) {
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
    const countries = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023", "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023", "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024", "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024", "01/2025", "02/2025", "03/2025", "04/2025", "05/2025", "06/2025", "07/2025", "08/2025", "09/2025", "10/2025", "11/2025", "12/2025"]
    let defaultValue;
    countries.map(count => {
        if (dataatual == count) {
            defaultValue = dataatual
        }
    })
    const [selected, setSelected] = useState(dataatual);
    const [pagas, setPagas] = useState(false);
    const [naoPagas, setNaoPagas] = useState(false);
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(false);
    const [nexPage, setNexPage] = useState(false);

    async function despTodosDados(despesas) {
        const despesasTotais = [];
        let json;
        for (des of despesas) {
            const forn = await FornecedorController.findById(des.fornecedor_id);
            const categoria = await CategoriaController.findById(des.categoria_id);
            const data = new Date(des.data_entrada).toLocaleString().substring(0, 10);
            let dataPagamento = "";
            if (des.data_pagamento) {
                dataPagamento = new Date(des.data_pagamento).toLocaleString().substring(0, 10);
            } else {
                dataPagamento = "";
            }

            json = {
                "id": des.id,
                "valor": des.valor,
                "categoria_id": des.categoria_id,
                "categoria": categoria.titulo,
                "fornecedor_id": des.fornecedor_id,
                "fornecedor": forn.name,
                "data_entrada": data,
                "data_pagamento": dataPagamento,
                "pago": des.pago
            }

            despesasTotais.push(json);
        }

        return despesasTotais;
    }

    async function atualizarDespesas() {
        dispatch({ 'type': 'loading' });
        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-31T00:00:00").getTime();
        const despesas = await PagarController.listAllFixas(page, datainicio, datafim, pagas, naoPagas);
        console.log(despesas);
        const despNext = await PagarController.listAllFixas(page + 1, datainicio, datafim, pagas, naoPagas);
        const despPrev = await PagarController.listAllFixas(page - 1, datainicio, datafim, pagas, naoPagas);
        if (despNext.length > 0) {
            setNexPage(true);
        } else {
            setNexPage(false);
        }

        if (despPrev.length > 0) {
            setPrevPage(true);
        } else {
            setPrevPage(false);
        }

        dispatch({
            "type": "atualizarDespesasFixas",
            "despesasFixas": await despTodosDados(despesas)
        })

        dispatch({ 'type': 'loadingfalse' })
    }


    useEffect(() => {
        listDespesas();
    }, [selected, pagas, naoPagas, page])

    useEffect(() => {
        handleOrderClick();
        console.log("searchText", searchText);
    }, [searchText])

    async function listDespesas() {
        if (searchText == "") {
            await atualizarDespesas();
        }
    }

    async function handleOrderClick() {
        if (searchText != "") {
            console.log("entrou");
            dispatch({ "type": "loading" })
            const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
            const datafim = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-31T00:00:00").getTime();
            let newList = null;
            newList = await PagarController.findFornecedororCategoria(searchText, 50, datainicio, datafim);
            const despesasTotais = await despTodosDados(newList);
            const action = {
                "type": "atualizarDespesas",
                "despesas": despesasTotais
            }

            dispatch(action);
            setNexPage(false);
            setPrevPage(false);
            dispatch({ "type": "loadingfalse" })
        } else {
            await listDespesas();
        }
    }

    async function removeDespesa(id) {
        const desp = await PagarController.remove(id);
        dispatch({ 'type': 'loading' });
        await atualizarDespesas();
        dispatch({ 'type': 'loadingfalse' })
    }

    async function nextPage() {
        setPage(page + 1);
    }

    async function previousPage() {
        setPage(page - 1);
    }

    async function addDespesa() {
        navigation.navigate("AddDespesa");
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.iconeCategoria}>
                    <Text style={styles.textCategoria}>{item.data_entrada}</Text>
                    <Text style={styles.textCategoria}>{item.categoria}</Text>
                    <Text style={styles.textCategoria}>Despesa {item.fixa ? "fixa" : "variável"}</Text>
                </View>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.fornecedor}</Text>
                    <Text style={styles.textList}>R$ {item.valor}</Text>
                    <Text>{item.data_pagamento}</Text>
                </View>
            </View>
            <View>
                {item.pago ? (
                    <>
                        <Image style={styles.image} source={require('../../../assets/verde.png')} resizeMode='contain' />
                    </>
                ) : (
                    <>
                        <Image style={styles.image} source={require('../../../assets/vermelho.png')} resizeMode='contain' />
                    </>
                )}
                <TouchableOpacity><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { removeDespesa(item.id) }}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Despesas Fixas</Text>
            </View>
            <View style={styles.select}>
                <View style={styles.checkboxs}>
                    <View>
                        <View style={styles.checkbox}>
                            <Text>Não pagas</Text>
                            <Checkbox
                                style={styles.checkbox2}
                                value={naoPagas}
                                onValueChange={setNaoPagas}
                                color={naoPagas ? '#4630EB' : undefined}
                            />
                        </View>
                        <View style={styles.checkbox}>
                            <Text>Pagas</Text>
                            <Checkbox
                                style={styles.checkbox3}
                                value={pagas}
                                onValueChange={setPagas}
                                color={pagas ? '#4630EB' : undefined}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.selectHome}>
                    <SelectDropdown
                        buttonStyle={styles.selected}
                        defaultValue={defaultValue}
                        data={countries}
                        onSelect={(selectedItem, index) => { setSelected(selectedItem); }}
                    />
                </View>

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
                        data={state.despesasFixas}
                        ListEmptyComponent={<Vazio text={"Nenhuma despesa encontrada!"} />}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}

                    />
                    <View style={styles.buttons}>
                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addDespesa}>
                                <AntDesign name="pluscircleo" size={50} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pagesNext}>
                            {prevPage &&
                                <>
                                    <View style={styles.buttonAdd}>
                                        <TouchableOpacity onPress={async () => { await previousPage() }}>
                                            <AntDesign name="leftcircleo" size={40} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                            {nexPage &&
                                <View style={styles.buttonAdd}>
                                    <TouchableOpacity onPress={async () => { await nextPage() }}>
                                        <AntDesign name="rightcircleo" size={40} color="black" />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}