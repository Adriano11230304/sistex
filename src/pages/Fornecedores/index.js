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
import RenderFooter from '../../components/RenderFooter';

export default function Fornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [ list, setList ] = useState(null);
    const [loadingList, setLoadingList] = useState(null);

    useEffect(() => {
        dispatch({"type": "loading"})
        listFornecedores();
        console.log("fornecedoresAdd");
        dispatch({"type": "loadingfalse"})
    }, [])

    useEffect(() => {
        handleOrderClick(limit);
        console.log(searchText);
    }, [searchText])

    const listFornecedores = async () => {
        if(searchText == ""){
            const forn = await FornecedorController.listAll(limit, 0)
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": forn
              }
    
              dispatch(action);

            console.log("dispatch", state);
        }

        console.log(navigation);
    }

    const handleOrderClick = async (limit) => {
                if(searchText != ""){
                    dispatch({"type": "loading"})
                    let newList = null;
                    newList = await FornecedorController.findNameorEmail(searchText, limit);
                    const action = {
                        "type": "atualizarFornecedores",
                        "fornecedores": newList
                    }
    
                    dispatch(action);
                    console.log("entrou");
                    dispatch({"type": "loadingfalse"})
                }
                
    };

    const addFornecedores = async () => {
        navigation.navigate('AddFornecedor');
    }

    const setText = (t) => {
        console.log("setText");
        setSearchText(t)
    }

    async function atualizar(){
        setLoadingList(true);
        await FornecedorController.listAll(limit, state.fornecedores.length)
            .then(res => {
                dispatch({
                    "type": "atualizarFornecedores",
                    "fornecedores": [...state.fornecedores, ...res]
                })
            })

        setLoadingList(false)
        
    }

    async function visualizar(id) {
        navigation.navigate('VisFornecedor')
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
            "fornecedores": await FornecedorController.listAll(10, 0)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })


    }

    const _renderitem = ({ item }) => <FornecedorCard item={item} visualizar={() => visualizar(item.id)} del={() => deleteFornecedor(item.id)} edit={() => {editFornecedor(item.id)}} />;


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
                        showsVerticalScrollIndicator={false}
                        onEndReached={async () => {await atualizar()}}
                        onEndReachedThreshold={0.1}
                        data={state.fornecedores}
                        renderItem={_renderitem}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={<RenderFooter loading={loadingList}/>}
                    />

                    <View style={styles.buttonAdd}>
                            <TouchableOpacity onPress={addFornecedores}>
                            <AntDesign name="pluscircleo" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}