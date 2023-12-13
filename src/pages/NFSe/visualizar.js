import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import ReceberController from '../../controllers/ReceberController';
import ClienteController from '../../controllers/ClienteController';
import NfseController from '../../controllers/NfseController';

export default function Visnfse({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [recebida, setRecebida] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [cnpj, setCnpj] = useState(null);

    useEffect(() => {
        async function visualizarNfse() {
            await NfseController.findById(route.params.paramskey)
                .then(async res => {
                    setValor(res.valor.toFixed(2));
                    setDescricao(res.descricao);
                    let setaCliente = await ClienteController.findById(res.cliente_id);
                    setCliente(setaCliente.name);
                    setCnpj(setaCliente.cnpj);
                })
        }

        visualizarNfse();
    }, [])

    function voltar() {
        navigation.navigate("NfseStack");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Dados da NFse</Text>
            </View>
            {state.loading ? (
                <>
                    <LoaderSimple />
                </>
            ) : (
                <>
                    <View style={styles.visualizarPagar}>
                        <Text style={styles.visualizarPagarText}>Valor: {valor}</Text>
                        <Text style={styles.visualizarPagarText}>Descricao: {descricao}</Text>
                        <Text style={styles.visualizarPagarText}>Cliente: {cliente}</Text>
                            <Text style={styles.visualizarPagarText}>CNPJ do Cliente: {cnpj}</Text>
                    </View>
                    <TouchableOpacity style={styles.salvarUpdate3} onPress={voltar}>
                        <Text style={styles.salvarTextUpdate}>Voltar</Text>
                    </TouchableOpacity>
                </>
            )}

        </SafeAreaView>
    )
}