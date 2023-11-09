import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import CategoriaController from '../../controllers/CategoriaController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { categoriaValidate } from '../../controllers/utils/validators';

export default function AddCategoria({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [titulo, setTitulo] = useState(null);
    const [loading, setLoading] = useState(false);

    const addCategoria = async () => {
        setLoading(true);
        const validatecat = {
            "titulo": titulo
        }
        const teste = await categoriaValidate(validatecat);
        if (teste.isValid) {
            const cat = await CategoriaController.add(titulo);
            ToastAndroid.show("Categoria adicionada com sucesso!", ToastAndroid.SHORT);
            const cats = await CategoriaController.listAll(1);
            console.log(cats);
            const action = {
                "type": "atualizarCategorias",
                "categorias": await CategoriaController.listAll(1)
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('CategoriasStack', '1');
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <>
                    <LoaderSimple />
                </>
            ) : (
                <>
                    <Header />
                    <View style={styles.title}>
                        <Text style={styles.text}>Adicionar uma nova categoria</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Título:</Text>
                            <TextInput style={styles.inputadd} value={titulo} placeholder='Adicione o titulo' placeholderTextColor="#888" onChangeText={(t) => setTitulo(t)}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.salvar} onPress={addCategoria}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </SafeAreaView>
    )};

