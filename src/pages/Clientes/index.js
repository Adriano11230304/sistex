import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import ClienteController from '../../controllers/ClienteController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { ClienteCard } from '../../components/ListCliente';
import { SeparatorItem } from '../../components/SeparatorItem'
import Vazio from '../../components/Vazio';

export default function Clientes({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(false);
    const [nexPage, setNexPage] = useState(false);

    useEffect(() => {
        listClientes();
    }, [page])

    const listClientes = async () => {
        if (searchText == "") {
            dispatch({ "type": "loading" })
            const clientes = await ClienteController.listAll(page)
            const action = {
                "type": "atualizarClientes",
                "clientes": clientes
            }
            console.log("page", page);

            dispatch(action);
            const cliNext = await ClienteController.listAll(page + 1);
            const cliPrev = await ClienteController.listAll(page - 1);
            if (cliNext.length > 0) {
                setNexPage(true);
            } else {
                setNexPage(false);
            }

            if (cliPrev.length > 0) {
                setPrevPage(true);
            } else {
                setPrevPage(false);
            }
            dispatch({ "type": "loadingfalse" })
        }
    }

    const handleOrderClick = async () => {
        if (searchText != "") {
            dispatch({ "type": "loading" })
            let newList = null;
            newList = await ClienteController.findNameorEmail(searchText, 30);
            const action = {
                "type": "atualizarClientes",
                "clientes": newList
            }

            dispatch(action);
            setNexPage(false);
            setPrevPage(false);
            dispatch({ "type": "loadingfalse" })
        } else {
            await listClientes();
        }
        console.log('search');

    };

    const addCliente = async () => {
        setPage(1);
        navigation.navigate('AddCliente');
    }

    const setText = (t) => {
        setSearchText(t)
    }

    async function visualizar(id) {
        navigation.navigate('VisCliente', {
            "paramskey": id
        })
    }

    async function editCliente(id) {
        console.log(id);
        navigation.navigate('EditCliente', {
            "paramskey": id
        })
    }

    const deleteCliente = async (id) => {
        dispatch({ "type": "loading" })
        const deleteCli = await ClienteController.remove(id);
        ToastAndroid.show(deleteCli, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarClientes",
            "clientes": await ClienteController.listAll(page)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })


    }

    const nextPage = async () => {
        dispatch({ "type": "loading" })
        const total = await ClienteController.listAllAll();
        console.log("total", total.length);
        setPage(page + 1);
    }

    const previousPage = async () => {
        dispatch({ "type": "loading" })
        const total = await ClienteController.listAllAll();
        console.log("total", total.length);
        setPage(page - 1);
    }

    function _renderitem({ item }) {
        return (
            <ClienteCard
                name={item.name}
                cnpj={item.cnpj}
                id={item.id}
                visualizar={() => visualizar(item.id)}
                del={() => deleteCliente(item.id)}
                edit={() => { editCliente(item.id) }}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Clientes</Text>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise pelo nome, cpf/cnpj ou email"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(t) => setText(t)}
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
                        maxToRenderPerBatch={50}
                        initialNumToRender={50}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Vazio text="Nenhum cliente encontrado!"/>}
                        data={state.clientes}
                        renderItem={_renderitem}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.buttons}>
                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addCliente}>
                                <AntDesign name="pluscircleo" size={40} color="black" />
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