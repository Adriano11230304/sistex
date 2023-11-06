import { StatusBar } from 'expo-status-bar';
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
import { categorias } from '../Categgorias/index'


export default function ContasPagar() {
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [despesas, setDespesas] = useState();


    useEffect(() => {
        // console.log(conta);
        // const testando = await Pagar.findById(1);
        // console.log(new Date(testando[0].data_pagamento).toLocaleString());
        listDespesas();
    }, [])

    async function listDespesas(){
        // const conta = await PagarController.add(5.56, "teste", 0, false, 'supermercado', 1, Date.now(), new Date("2023-10-05T00:00:00").getTime(), false, new Date("2023-10-25T00:00:00").getTime())
        dispatch({'type': 'loading'});
        // const del = await PagarController.remove(8);
        // console.log(del);
        const despesas = await PagarController.listAll(page);
        const despesasTotais = [];
        let json;
        despesas.map(async des => {
            const forn = await FornecedorController.findById(des.fornecedor_id);
            const data = new Date(des.data_entrada).toLocaleString().substring(0, 10);
            let dataPagamento = "";
            if(des.data_pagamento){
                dataPagamento = new Date(des.data_pagamento).toLocaleString().substring(0, 10);
            }else{
                dataPagamento = "";
            }
            
            json = {
                "id": des.id,
                "valor": des.valor,
                "categoria": des.categoria,
                "fornecedor_id": des.fornecedor_id,
                "fornecedor": forn.name,
                "data_entrada": data,
                "data_pagamento": dataPagamento
            }
            console.log(json);
            despesasTotais.push(json);
        })
        

        dispatch({
            "type": "atualizarDespesas",
            "despesas": despesasTotais
        })

        console.log("despesas", despesas);

        dispatch({'type': 'loadingfalse'})
    }

    const Item = ({item}) => (
        <TouchableOpacity style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.iconeCategoria}>
                    <Text style={styles.textCategoria}>{item.data_entrada}</Text>
                    <Text style={styles.textCategoria}>{item.categoria}</Text>
                </View>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.fornecedor}</Text>
                    <Text style={styles.textList}>R$ {item.valor}</Text>
                    <Text>{item.data_pagamento}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
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
                        ItemSeparatorComponent={SeparatorItem}
                        initialNumToRender={50}
                        maxToRenderPerBatch={50}
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