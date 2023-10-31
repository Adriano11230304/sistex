import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';

export default function VisFornecedor({navigation, route}){
    const { state, dispatch } = useAuth();
    const [fornecedor, setFornecedor] = useState(null);

    useEffect(() => {
        visualizarForn();
    }, [fornecedor])
    

    async function visualizarForn(){
        setFornecedor(await FornecedorController.findById(route.params.paramskey));
        console.log(route.params.paramskey);
        console.log(fornecedor);
    }

    function voltar(){
        navigation.navigate("FornecedoresStack");
    }

return (
    <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.title}>
            <Text style={styles.text}>Dados do Fornecedor</Text>
        </View>
        {state.loading ? (
            <>
                <LoaderSimple />
            </>
        ) : (
            <>
                <View style={styles.visualizarFornecedor}>
                    <Text style={styles.visualizarFornecedorText}>Nome: {/*fornecedor.name*/}</Text>
                    <Text style={styles.visualizarFornecedorText}>E-mail: {/*fornecedor.email*/}</Text>
                    <Text style={styles.visualizarFornecedorText}>CNPJ: {/*fornecedor.cnpj*/}</Text>
               </View>
               <TouchableOpacity style={styles.salvarUpdate2} onPress={voltar}>
                    <Text style={styles.salvarTextUpdate}>Voltar</Text>
                </TouchableOpacity>
            </>
        )}

    </SafeAreaView>
)}