import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import ReceberController from '../../controllers/ReceberController';
import ClienteController from '../../controllers/ClienteController';

export default function VisReceber({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [recebida, setRecebida] = useState(null);
    const [ parcelamento, setParcelamento ] = useState("Não");
    const [ forma_recebimento, setForma_recebimento ] = useState("pix");
    const [ data_entrada, setData_entrada ] = useState(null);
    const [ data_recebimento, setData_recebimento ] = useState(null);
    const [ parcela, setParcela ] = useState(null);
    const [ cliente, setCliente ] = useState(null);
    const [ data_vencimento, setData_vencimento ] = useState(null);

    useEffect(() => {
        async function visualizarReceber() {
            await ReceberController.findById(route.params.paramskey)
                .then(async res => {
                    setValor(res.valor.toFixed(2));
                    setObservacoes(res.observacoes);
                    res.recebida ? setRecebida("Sim") : setRecebida("Não");
                    res.parcelamento ? setParcelamento("Sim") : setParcelamento("Não");
                    setForma_recebimento(res.forma_recebimento);
                    setData_entrada(new Date(res.data_entrada).toLocaleString().substring(0, 10));
                    res.data_vencimento ? setData_vencimento(new Date(res.data_vencimento).toLocaleString().substring(0, 10)) : null;
                    res.data_recebimento ? setData_recebimento(new Date(res.data_recebimento).toLocaleString().substring(0, 10)) : null;
                    setParcela(res.parcelas);
                    let setaCliente = await ClienteController.findById(res.cliente_id);
                    setCliente(setaCliente.name);
                    console.log("findById", res);
                })
        }

        visualizarReceber();
    }, [])

    function voltar() {
        navigation.navigate("ReceitaStack");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Dados da Receita</Text>
            </View>
            {state.loading ? (
                <>
                    <LoaderSimple />
                </>
            ) : (
                <>
                    <View style={styles.visualizarPagar}>
                        <Text style={styles.visualizarPagarText}>Valor: {valor}</Text>
                        <Text style={styles.visualizarPagarText}>Data de Entrada: {data_entrada}</Text>
                        <Text style={styles.visualizarPagarText}>Parcela: {parcela}</Text>
                        <Text style={styles.visualizarPagarText}>Despesa está recebida: {recebida}</Text>
                        <Text style={styles.visualizarPagarText}>Data de recebimento: {data_recebimento}</Text>
                        <Text style={styles.visualizarPagarText}>Receita está parcelada: {parcelamento}</Text>
                        <Text style={styles.visualizarPagarText}>Cliente: {cliente}</Text>
                        <Text style={styles.visualizarPagarText}>Forma de Recebimento: {forma_recebimento}</Text>
                        <Text style={styles.visualizarPagarText}>Data de vencimento: {data_vencimento}</Text>
                        <Text style={styles.visualizarPagarText}>Observações: {observacoes}</Text>
                    </View>
                    <TouchableOpacity style={styles.salvarUpdate3} onPress={voltar}>
                        <Text style={styles.salvarTextUpdate}>Voltar</Text>
                    </TouchableOpacity>
                </>
            )}

        </SafeAreaView>
    )
}