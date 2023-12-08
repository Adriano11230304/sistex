import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { SeparatorItem } from '../../components/SeparatorItem';
import { useAuth } from '../../store/auth';
import LoaderSimple from '../../components/LoaderSimple';
import NotificacaoController from '../../controllers/NotificacaoController';

export default function Notifications() {
    const { state, dispatch } = useAuth();
    useEffect(() => {
        loadNotificacoes();
    }, [])

    async function loadNotificacoes(){
        dispatch({"type": "loading"})
        dispatch({
            "type": "atualizarNotificacoes",
            "notificacoes": await NotificacaoController.listAll(1)
        });
        const nots = await NotificacaoController.listAll(1);
        console.log(nots);
        dispatch({ "type": "loadingfalse" })
    }

    async function delNotificacao(id){
        dispatch({ "type": "loading" })
        const deleteNot = await NotificacaoController.remove(id);
        ToastAndroid.show(deleteNot, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarNotificacoes",
            "notificacoes": await NotificacaoController.listAll(1)
        }

        dispatch(action);

        dispatch({ "type": "loadingfalse" })
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item.titulo}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => delNotificacao(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
   
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Notificações</Text>
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
                        data={state.notificacoes}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.id}

                    />
                </>
            )}
        </SafeAreaView>
    );
}