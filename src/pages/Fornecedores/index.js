import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import FornecedorCard from '../../components/ListFornecedor'
import { SeparatorItem } from '../../components/SeparatorItem'

export default function Fornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(false);
    const [nexPage, setNexPage] = useState(false);

    useEffect(() => {
        listFornecedores();
    }, [page])

    useEffect(() => {
        handleOrderClick();
        console.log(searchText);
    }, [searchText])

    const listFornecedores = async () => {
        if(searchText == ""){
            dispatch({"type": "loading"})
            const forn = await FornecedorController.listAll(page)
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": forn
            }
            console.log("page", page);
    
            dispatch(action);
            const fornNext = await FornecedorController.listAll(page + 1);
            const fornPrev = await FornecedorController.listAll(page - 1);
            if(fornNext.length > 0){
                setNexPage(true);
            }else{
                setNexPage(false);
            }

            if(fornPrev.length > 0){
                setPrevPage(true);
            }else{
                setPrevPage(false);
            }
            dispatch({"type": "loadingfalse"})
        }
    }

    const handleOrderClick = async () => {
                if(searchText != ""){
                    dispatch({"type": "loading"})
                    let newList = null;
                    newList = await FornecedorController.findNameorEmail(searchText, 50);
                    const action = {
                        "type": "atualizarFornecedores",
                        "fornecedores": newList
                    }
    
                    dispatch(action);
                    setNexPage(false);
                    setPrevPage(false);
                    dispatch({"type": "loadingfalse"})
                }else{
                    await listFornecedores();
                }
                console.log('search');
                
    };

    const addFornecedores = async () => {
        setPage(1);
        navigation.navigate('AddFornecedor');
    }

    const setText = (t) => {
        setSearchText(t)
    }

    async function visualizar(id) {
        navigation.navigate('VisFornecedor', {
            "paramskey": id
        })
    }

    async function editFornecedor(id) {
        navigation.navigate('EditFornecedores', {
            "paramskey": id
        })
    }

    const deleteFornecedor = async (id) => {
        dispatch({ "type": "loading" })
        const deleteForn = await FornecedorController.remove(id);
        ToastAndroid.show(deleteForn, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarFornecedores",
            "fornecedores": await FornecedorController.listAll(page)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })


    }

    const nextPage = async () => {
        dispatch({ "type": "loading" })
        const total = await FornecedorController.listAllAll();
        console.log("total", total.length);
        setPage(page + 1);
    }

    const previousPage = async () => {
        dispatch({ "type": "loading" })
        const total = await FornecedorController.listAllAll();
        console.log("total", total.length);
        setPage(page - 1);
    }

    function _renderitem ({ item }){
        return(
            <FornecedorCard 
                name={item.name}
                cnpj={item.cnpj}
                id={item.id} 
                visualizar={() => visualizar(item.id)} 
                del={() => deleteFornecedor(item.id)} 
                edit={() => { editFornecedor(item.id) }} 
            />
        )
    } 


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Fornecedores</Text>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise pelo nome, cpf/cnpj ou email"
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
                        maxToRenderPerBatch={50}
                        initialNumToRender={50}
                        showsVerticalScrollIndicator={false}
                        data={state.fornecedores}
                        renderItem={_renderitem}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.buttons}>
                        <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addFornecedores}>
                                <AntDesign name="pluscircleo" size={40} color="black" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.pagesNext}>
                            {prevPage && 
                                <>
                                    <View style={styles.buttonAdd}>
                                        <TouchableOpacity onPress={async () => {await previousPage()}}>
                                            <AntDesign name="leftcircleo" size={40} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                            {nexPage && 
                                <View style={styles.buttonAdd}>
                                    <TouchableOpacity onPress={async () => {await nextPage()}}>
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