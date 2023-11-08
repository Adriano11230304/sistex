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
import Checkbox from 'expo-checkbox';
import SelectDropdown from 'react-native-select-dropdown';




export default function ContasPagar() {
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
    const countries = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023", "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023", "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024", "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024", "01/2025", "02/2025", "03/2025", "04/2025", "05/2025", "06/2025", "07/2025", "08/2025", "09/2025", "10/2025", "11/2025", "12/2025", "01/2026", "02/2026", "03/2026", "04/2026", "05/2026", "06/2026", "07/2026", "08/2026", "09/2026", "10/2026", "11/2026", "12/2026", "01/2027", "02/2027", "03/2027", "04/2027", "05/2027", "06/2027", "07/2027", "08/2027", "09/2027", "10/2027", "11/2027", "12/2027", "01/2028", "02/2028", "03/2028", "04/2028", "05/2028", "06/2028", "07/2028", "08/2028", "09/2028", "10/2028", "11/2028", "12/2028", "01/2029", "02/2029", "03/2029", "04/2029", "05/2029", "06/2029", "07/2029", "08/2029", "09/2029", "10/2029", "11/2029", "12/2029", "01/2030", "02/2030", "03/2030", "04/2030", "05/2030", "06/2030", "07/2030", "08/2030", "09/2030", "10/2030", "11/2030", "12/2030"]
    let defaultValue;
    countries.map(count => {
        if (dataatual == count) {
            defaultValue = dataatual
        }
    })
    const [selected, setSelected] = useState(dataatual);
    const [fixa, setFixa] = useState(false);
    const [pagas, setPagas] = useState(false);
    const [naoPagas, setNaoPagas] = useState(false);
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);


    useEffect(() => {
        // console.log(conta);
        // const testando = await Pagar.findById(1);
        // console.log(new Date(testando[0].data_pagamento).toLocaleString());
        listDespesas();
    }, [selected])

    async function listDespesas(){
        // const conta = await PagarController.add(5.56, "teste", 0, false, 'supermercado', 18, Date.now(), new Date("2023-10-05T00:00:00").getTime(), true, new Date("2023-10-25T00:00:00").getTime())
        dispatch({'type': 'loading'});
        // const del = await PagarController.remove(8);
        // console.log(del);
        // CRIAR TIMESTAMP DE INICIO E FIM

        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-31T00:00:00").getTime();
        console.log(datafim);
        const teste = new Date("2023-10-01T00:00:00").getTime();
        const teste1 = new Date("2023-10-31T00:00:00").getTime();
        console.log(teste1);
        const despesas = await PagarController.listAll(page, datainicio, datafim);
        console.log("despesas", despesas);
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
                "data_pagamento": dataPagamento,
                "pago": des.pago
            }

            despesasTotais.push(json);
        })
        

        dispatch({
            "type": "atualizarDespesas",
            "despesas": despesasTotais
        })


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
                {item.pago ? (
                    <>
                        <Image style={styles.image} source={require('../../../assets/verde.png')} resizeMode='contain'/>
                    </>
                ): (
                    <>
                            <Image style={styles.image} source={require('../../../assets/vermelho.png')} resizeMode='contain' />
                    </>
                )}
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
            <View style={styles.select}>
                <View style={styles.checkboxs}>
                <View style={styles.checkbox}>
                    <Text>Despesas Fixas</Text>
                    <Checkbox
                        style={styles.checkbox1}
                        value={fixa}
                        onValueChange={setFixa}
                        color={fixa ? '#4630EB' : undefined}
                    />
                </View>
                <View style={styles.checkbox}>
                    <Text>Despesas Não pagas</Text>
                    <Checkbox
                            style={styles.checkbox2}
                        value={naoPagas}
                        onValueChange={setNaoPagas}
                        color={naoPagas ? '#4630EB' : undefined}
                    />
                </View>
                <View style={styles.checkbox}>
                    <Text>Despesas Pagas</Text>
                    <Checkbox
                        style={styles.checkbox3}
                        value={pagas}
                        onValueChange={setPagas}
                        color={pagas ? '#4630EB' : undefined}
                    />
                </View>
                </View>
                <View style={styles.selectHome}>
                    <SelectDropdown 
                        buttonStyle={styles.selected} 
                        defaultValue={defaultValue}
                        data={countries}
                        onSelect={(selectedItem, index) => {setSelected(selectedItem);}}
                    />
                </View>

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