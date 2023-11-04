import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Categorias() {
    const [icone, setIcone] = useState();
    const [categorias, setCategorias] = useState();

    const icons = [{
        "titulo": "supermercado",
        "icone": <AntDesign name="shoppingcart" size={24} color="black" />
    },
    {
        "titulo": "comida",
        "icone": <MaterialCommunityIcons name="food-turkey" size={24} color="black" />
    }];

    return (
        <View style={styles.container}>
            <Header />
            <Text>Categorias</Text>
            <Text>Listar categorias</Text>
        </View>
    );
}