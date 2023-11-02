import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import PagarController from '../../controllers/PagarController';
import FornecedorController from '../../controllers/FornecedorController';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { useAuth } from '../../store/auth';

export default function ContasPagar() {
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);


    useEffect(() => {
        // console.log(conta);
        // const testando = await Pagar.findById(1);
        // console.log(new Date(testando[0].data_pagamento).toLocaleString());
        listDespesas();
    }, [])

    async function listDespesas(){
        // const conta = await PagarController.add(5.56, "teste", 0, false, "aluguel", 1, Date.now(), new Date("2023-10-05T00:00:00").getTime(), false, new Date("2023-10-25T00:00:00").getTime())
        dispatch({'type': 'loading'});
        const despesas = await PagarController.listAll(page);
        dispatch({
            "type": "atualizarDespesas",
            "despesas": despesas
        })

        console.log(state.despesas);

        dispatch({'type': 'loadingfalse'})
    }

    const Item = ({item}) => (
        <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
            <View style={styles.list}>
                <Text style={styles.textList}>{item.valor}</Text>
            </View>
            <View>
                {/*<TouchableOpacity onPress={() => edit(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => del(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>*/}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Despesas</Text>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise pelo fornecedor ou categoria"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(t) => setText(t)}
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
                        showsVerticalScrollIndicator={false}
                        data={state.despesas}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}
                        
                    />
                    {/*<View style={styles.buttons}>
                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addFornecedores}>
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
                        </View>*/}
                </>
            )}

        </SafeAreaView>
    );
}