import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { SeparatorItem } from '../../components/SeparatorItem';
import { useAuth } from '../../store/auth';
import LoaderSimple from '../../components/LoaderSimple';
import CategoriaController from '../../controllers/CategoriaController';

export default function Categorias({navigation, route}) {
    const [ searchText, setSearchText ] = useState("");
    const { state, dispatch } = useAuth();
    useEffect(() => {
        loadCategorias();
    }, [])

    const setText = (t) => {
        setSearchText(t)
    }

    const handleOrderClick = async () => {
        if (searchText != "") {
            dispatch({ "type": "loading" })
            let newList = null;
            newList = await CategoriaController.findTitulo(searchText, 30);
            const action = {
                "type": "atualizarCategorias",
                "categorias": newList
            }

            dispatch(action);
            dispatch({ "type": "loadingfalse" })
        } else {
            await loadCategorias();
        }
        console.log('search');

    };

    async function loadCategorias(){
        dispatch({"type": "loading"})
        dispatch({
            "type": "atualizarCategorias",
            "categorias": await CategoriaController.listAll(1)
        });
        const cats = await CategoriaController.listAll(1);
        console.log(cats);
        dispatch({ "type": "loadingfalse" })
    }

    async function delCategoria(id){
        dispatch({ "type": "loading" })
        const deleteCat = await CategoriaController.remove(id);
        ToastAndroid.show(deleteCat, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarCategorias",
            "categorias": await CategoriaController.listAll(1)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })
    }

    async function visCategoria(id){
        console.log("visualizar categoria");
    }

    async function addCategoria(){
        navigation.navigate('AddCategoria');
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => visCategoria(item.id)} style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.titulo}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => delCategoria(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Categorias</Text>
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
                        initialNumToRender={50}
                        maxToRenderPerBatch={50}
                        showsVerticalScrollIndicator={false}
                        data={state.categorias}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}

                    />
                </>
            )}
            <View style={styles.buttons}>
                <View style={styles.buttonAdd}>
                    <TouchableOpacity onPress={addCategoria}>
                        <AntDesign name="pluscircleo" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}