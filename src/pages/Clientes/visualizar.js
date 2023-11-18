import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import ClienteController from '../../controllers/ClienteController';

export default function VisCliente({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [name, setName] = useState(null);
    const [cnpj, setCnpj] = useState(null);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        async function visualizarClie() {
            await ClienteController.findById(route.params.paramskey)
                .then(res => {
                    setName(res.name);
                    setCnpj(res.cnpj);
                    setEmail(res.email);
                })
        }

        visualizarClie();
    }, [])

    function voltar() {
        navigation.navigate("ClienteStack");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Dados do Cliente</Text>
            </View>
            {state.loading ? (
                <>
                    <LoaderSimple />
                </>
            ) : (
                <>
                    <View style={styles.visualizarFornecedor}>
                        <Text style={styles.visualizarFornecedorText}>Nome: {name}</Text>
                        <Text style={styles.visualizarFornecedorText}>E-mail: {email}</Text>
                        <Text style={styles.visualizarFornecedorText}>CNPJ: {cnpj}</Text>
                    </View>
                    <TouchableOpacity style={styles.salvarUpdate3} onPress={voltar}>
                        <Text style={styles.salvarTextUpdate}>Voltar</Text>
                    </TouchableOpacity>
                </>
            )}

        </SafeAreaView>
    )
}