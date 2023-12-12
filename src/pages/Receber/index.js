import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import ReceberController from '../../controllers/ReceberController';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { useAuth } from '../../store/auth';
import { SeparatorItem } from '../../components/SeparatorItem';
import Checkbox from 'expo-checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import Vazio from '../../components/Vazio';
import { receitasTodosDados, somatorioReceitas, totalReceitasSeparadas, totalDespesasSeparadas } from '../../controllers/utils/functions';
import PagarController from '../../controllers/PagarController';

export default function ContasReceber({ navigation, route }) {
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
    const [recebidas, setRecebidas] = useState(false);
    const [naoRecebidas, setNaoRecebidas] = useState(false);
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(false);
    const [nexPage, setNexPage] = useState(false);

    async function atualizarReceitas() {
        dispatch({ 'type': 'loading' });
        let mesfim = 1 + parseInt(selected.substring(0, 2));
        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
        const receitas = await ReceberController.listAll(page, datainicio, datafim, recebidas, naoRecebidas);
        const recNext = await ReceberController.listAll(page + 1, datainicio, datafim, recebidas, naoRecebidas);
        const recPrev = await ReceberController.listAll(page - 1, datainicio, datafim, recebidas, naoRecebidas);
        if (recNext.length > 0) {
            setNexPage(true);
        } else {
            setNexPage(false);
        }

        if (recPrev.length > 0) {
            setPrevPage(true);
        } else {
            setPrevPage(false);
        }

        dispatch({
            "type": "atualizarReceitas",
            "receitas": await receitasTodosDados(receitas),
            "valorTotalReceitas": somatorioReceitas(receitas)
        })

        dispatch({ 'type': 'loadingfalse' })
    }


    useEffect(() => {
        listReceitas();
    }, [selected, recebidas, naoRecebidas, page])

    async function listReceitas() {
        if (searchText == "") {
            await atualizarReceitas();
        }
    }

    async function handleOrderClick() {
        if (searchText != "") {
            dispatch({ "type": "loading" })
            const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
            let mesfim = 1 + parseInt(selected.substring(0, 2));
            const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
            let newList = null;
            newList = await ReceberController.findClientesorForma(searchText, datainicio, datafim, 50);
            const receitasTotais = await receitasTodosDados(newList);
            const receitastot = await ReceberController.listAllNoPage(datainicio, datafim);
            const totReceitas = totalReceitasSeparadas(receitastot);
            const action = {
                "type": "atualizarReceitas",
                "receitas": receitasTotais,
                "valorTotalReceitas": somatorioReceitas(newList)
            }

            dispatch(action);
            console.log(state.valorTotalReceitasNoPage);
            setNexPage(false);
            setPrevPage(false);
            dispatch({ "type": "loadingfalse" })
        } else {
            await listReceitas();
        }
    }

    async function removeReceita(id) {
        const receita = await ReceberController.remove(id);
        dispatch({ 'type': 'loading' });
        await atualizarReceitas();
        dispatch({ 'type': 'loadingfalse' })
        ToastAndroid.show("Receita excluída com sucesso!", ToastAndroid.SHORT);
    }

    async function nextPage() {
        setPage(page + 1);
    }

    async function previousPage() {
        setPage(page - 1);
    }

    async function addReceita() {
        navigation.navigate("AddReceita");
    }

    async function alterRecebida(item) {
        let receber;
        let data_recebimento;
        if (item.recebida) {
            receber = false;
            data_recebimento = null;
            await ReceberController.alterReceber(receber, data_recebimento, item.id);
            await listReceitas();
        } else {
            navigation.navigate('AddReceitaRecebimento', {
                "paramskey": item.id
            })

        }
    }

    function editReceita(id) {
        navigation.navigate("UpdateReceita", {
            "key": id
        })
    }

    function visualizar(id) {
        navigation.navigate("VisReceber", {
            "paramskey": id
        })
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
            <View style={styles.list}>
                <View style={styles.iconeCategoria}>
                    {item.parcelamento ? (<><Text style={styles.textCategoria}>[Parcelamento]</Text></>) : (<></>)}
                    <Text style={styles.textCategoria}>{item.data_entrada}</Text>
                    <Text style={styles.textCategoria}>{item.forma_recebimento}</Text>
                </View>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.cliente}</Text>
                    <Text style={styles.textList}>R$ {item.valor.toFixed(2)}</Text>
                    <Text style={!item.recebida ? {color: 'red'} : {}}>{item.recebida ? item.data_recebimento : item.data_vencimento}</Text>
                </View>
            </View>
            <View>
                {item.recebida ? (
                    <>
                        <TouchableOpacity onPress={() => alterRecebida(item)}>
                            <Image style={styles.image} source={require('../../../assets/verde.png')} resizeMode='contain' />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => alterRecebida(item)}>
                            <Image style={styles.image} source={require('../../../assets/vermelho.png')} resizeMode='contain' />
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity onPress={() => editReceita(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => { removeReceita(item.id) }}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Receitas</Text>
            </View>
            <View style={styles.valorTotal}><Text style={styles.valorTotalText}>Valor Total: R$ {state.valorTotalReceitas}</Text></View>
            <View style={styles.select}>
                <View style={styles.checkbox}>
                    <Text>Não recebidas</Text>
                    <Checkbox
                        style={styles.checkbox2}
                        value={naoRecebidas}
                        onValueChange={(value) => {
                            setNaoRecebidas(value)
                            setRecebidas(false)
                        }}
                        color={naoRecebidas ? '#4630EB' : undefined}
                    />
                </View>
                <View style={styles.checkbox}>
                    <Text>Recebidas</Text>
                    <Checkbox
                        style={styles.checkbox3}
                        value={recebidas}
                        onValueChange={(value) => {
                            setRecebidas(value)
                            setNaoRecebidas(false)
                        }}
                        color={recebidas ? '#4630EB' : undefined}
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
                    placeholder="Cliente ou forma de recebimento"
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
                        data={state.receitas}
                        ListEmptyComponent={<Vazio text={"Nenhuma receita encontrada!"} />}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}

                    />
                    <View style={styles.buttons}>
                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addReceita}>
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