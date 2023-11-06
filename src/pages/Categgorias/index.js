import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { SeparatorItem } from '../../components/SeparatorItem';
import { useAuth } from '../../store/auth';
import LoaderSimple from '../../components/LoaderSimple';

export default function Categorias() {
    const { state, dispatch } = useAuth();
    const [categorias, setCategorias] = useState();
    useEffect(() => {
        loadCategorias();
    }, [])

    async function loadCategorias(){
        const cat = ["supermercado", "agua", "luz", "internet", "impostos", "marketing", "pessoas", "materia-prima", "aluguel","outros"]
        setCategorias(cat);
    }

    const Item = ({ item }) => (
        <TouchableOpacity style={styles.itemList}>
            <View style={styles.list}>
                <View style={styles.textListPagar}>
                    <Text style={styles.textList}>{item}</Text>
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
                        data={categorias}
                        renderItem={({ item }) => <Item item={item} />}

                    />
                </>
            )}
        </SafeAreaView>
    );
}

export const categorias = ["supermercado", "agua", "luz", "internet", "impostos", "marketing", "pessoas", "materia-prima", "aluguel","outros"]