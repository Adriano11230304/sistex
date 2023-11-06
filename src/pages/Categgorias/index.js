import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export default function Categorias() {
    const [icone, setIcone] = useState();
    const [categorias, setCategorias] = useState();
    useEffect(() => {
        loadCategorias();
    }, [])

    async function loadCategorias(){
        
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text>Categorias</Text>
            <Text>Listar categorias</Text>
            <Image style={styles.image} resizeMode='contain'
                source={require('../../../assets/carrinho.png')}
            />
            
        </View>
    );
}


export const categoriasArray = [
    "aluguel",
    "supermercado",
    "funcionários",
    "equipamentos"
]