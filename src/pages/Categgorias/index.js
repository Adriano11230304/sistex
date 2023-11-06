import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { saveCategorias, getCategorias } from '../../models/Categoria';

export default function Categorias() {
    const [icone, setIcone] = useState();
    const [categorias, setCategorias] = useState();
    let name;
    useEffect(() => {
        name = "csdcsc";
        loadCategorias();
    }, [])

    async function loadCategorias(){
        await saveCategorias();
        const categoriasjson = JSON.parse(await getCategorias());
        setCategorias(categoriasjson);
        console.log(categorias);
        console.log(categoriasjson);
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text>Categorias</Text>
            <Text>Listar categorias</Text>
            
        </View>
    );
}