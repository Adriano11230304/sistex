import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header';
import { SeparatorItem } from '../../components/SeparatorItem';
import { styles } from './style'
import LoaderSimple from '../../components/LoaderSimple';
import NfseController from '../../controllers/NfseController';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import ClienteController from '../../controllers/ClienteController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Nfse({ navigation, route }) {
    const { state, dispatch } = useAuth();
    
    useEffect(() => {
        loadNfses();
    }, [])

    async function loadNfses() {
        dispatch({ "type": "loading" })
        dispatch({
            "type": "atualizarNfse",
            "nfse": await NfseController.listAll(1)
        });
        const clientes = await ClienteController.listAll(1);
        console.log(state.nfse);
        dispatch({ "type": "loadingfalse" })
    }

    async function delNfse(id) {
        dispatch({ "type": "loading" })
        const deleteNf = await NfseController.remove(id);
        ToastAndroid.show(deleteNf, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarNfse",
            "nfse": await NfseController.listAll(1)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })
    }

    async function addNfse() {
        navigation.navigate('AddNfse');
    }

    function visualizar(id) {
        navigation.navigate("VisNfse", {
            "paramskey": id
        })
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.descricao}</Text>
                    <Text style={styles.textList}>valor: {item.valor}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => delNfse(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Notas Fiscais de Serviço</Text>
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
                        data={state.nfse}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}

                    />

                        <View style={styles.buttons}>
                            <View style={styles.buttonAdd}>
                                <TouchableOpacity onPress={addNfse}>
                                    <AntDesign name="pluscircleo" size={40} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                </>
            )}
        </SafeAreaView>
    );
}