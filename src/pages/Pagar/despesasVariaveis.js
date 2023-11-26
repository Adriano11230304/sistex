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
import { despTodosDados, somatorioDespesas } from '../../controllers/utils/functions';




export default function ContasPagarVariaveis({ navigation, route }) {
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

    async function atualizarDespesas() {
        dispatch({ 'type': 'loading' });
        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        let mesfim = 1 + parseInt(selected.substring(0, 2));
        const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
        const despesas = await PagarController.listAllVariaveis(page, datainicio, datafim, pagas, naoPagas);
        const despesast = await PagarController.listAll(page, datainicio, datafim, pagas, naoPagas);
        const despNext = await PagarController.listAllVariaveis(page + 1, datainicio, datafim, pagas, naoPagas);
        const despPrev = await PagarController.listAllVariaveis(page - 1, datainicio, datafim, pagas, naoPagas);
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
            "type": "atualizarDespesasVariaveis",
            "despesasVariaveis": await despTodosDados(despesas),
            "valorTotalVariaveis": somatorioDespesas(despesas)
        })
        dispatch({
            "type": "atualizarDespesas",
            "despesas": await despTodosDados(despesast),
            "valorTotal": somatorioDespesas(despesast)
        })

        dispatch({ 'type': 'loadingfalse' })
        console.log("entrou");
    }


    useEffect(() => {
        listDespesas();
    }, [selected, pagas, naoPagas, page])


    async function listDespesas() {
        if (searchText == "") {
            await atualizarDespesas();
        }
    }

    async function handleOrderClick() {
        if (searchText != "") {
            dispatch({ "type": "loading" })
            const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
            let mesfim = 1 + parseInt(selected.substring(0, 2));
            const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
            let newList = null;
            newList = await PagarController.findFornecedororCategoriaVariaveis(searchText, datainicio, datafim, 50);
            
            const despesasTotais = await despTodosDados(newList);
            const action = {
                "type": "atualizarDespesasVariaveis",
                "despesasVariaveis": despesasTotais,
                "valorTotalVariaveis": somatorioDespesas(newList)
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
        navigation.navigate("AddDespesaIcons", {
            "prefix": "variavel"
        });
    }

    async function alterPago(item) {
        let pagar;
        let data_pagamento;
        if (item.pago) {
            pagar = false;
            data_pagamento = null;
            const desp = await PagarController.alterPago(pagar, data_pagamento, item.id);
            await listDespesas();
        } else {
            navigation.navigate('AddDespesaPagamento', {
                "paramskey": item.id,
                "prefix": "variavel"
            })

        }
    }

    function editDespesa(id) {
        navigation.navigate("UpdateDespesas", {
            "key": id,
            "prefix": "variavel"
        })
    }

    function visualizar(id) {
        navigation.navigate("VisPagar", {
            "paramskey": id
        })
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id) }>
            <View style={styles.list}>
                <View style={styles.iconeCategoria}>
                    <Text style={styles.textCategoria}>{item.data_entrada}</Text>
                    <Text style={styles.textCategoria}>{item.categoria}</Text>
                    <Text style={styles.textCategoria}>Despesa {item.fixa ? "fixa" : "variável"}</Text>
                </View>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.fornecedor}</Text>
                    <Text style={styles.textList}>R$ {item.valor.toFixed(2)}</Text>
                    <Text style={!item.pago ? { color: 'red' } : {}}>{item.pago ? item.data_pagamento : item.data_vencimento}</Text>
                </View>
            </View>
            <View>
                {item.pago ? (
                    <>
                        <TouchableOpacity onPress={() => alterPago(item)}>
                            <Image style={styles.image} source={require('../../../assets/verde.png')} resizeMode='contain' />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => alterPago(item)}>
                            <Image style={styles.image} source={require('../../../assets/vermelho.png')} resizeMode='contain' />
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity onPress={() => editDespesa(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { removeDespesa(item.id) }}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Despesas Variáveis</Text>
            </View>
            <View style={styles.valorTotal}><Text style={styles.valorTotalText}>Valor Total: R$ {state.valorTotalVariaveis}</Text></View>
            <View style={styles.select}>
                <View style={styles.checkbox}>
                    <Text>Não pagas</Text>
                    <Checkbox
                        style={styles.checkbox2}
                        value={naoPagas}
                        onValueChange={(value) => {
                            setNaoPagas(value)
                            setPagas(false)
                        }}
                        color={naoPagas ? '#4630EB' : undefined}
                    />
                </View>
                <View style={styles.checkbox}>
                    <Text>Pagas</Text>
                    <Checkbox
                        style={styles.checkbox3}
                        value={pagas}
                        onValueChange={(value) => {
                            setPagas(value)
                            setNaoPagas(false)
                        }}
                        color={pagas ? '#4630EB' : undefined}
                    />
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
                <TouchableOpacity onPress={handleOrderClick}>
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
                        data={state.despesasVariaveis}
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