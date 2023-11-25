import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import PagarController from '../../controllers/PagarController';
import CategoriaController from '../../controllers/CategoriaController';
import FornecedorController from '../../controllers/FornecedorController';

export default function VisPagar({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [valor, setValor] = useState(null);
    const [observacoes, setObservacoes] = useState(null);
    const [pago, setPago] = useState(null);
    const [ parcelamento, setParcelamento ] = useState("Não");
    const [ forma_pagamento, setForma_pagamento ] = useState("pix");
    const [ data_entrada, setData_entrada ] = useState(null);
    const [ data_pagamento, setData_pagamento ] = useState(null);
    const [ parcela, setParcela ] = useState(null);
    const [ categoria, setCategoria ] = useState(null);
    const [ fornecedor, setFornecedor ] = useState(null);
    const [ fixa, setFixa ] = useState(null);
    const [ data_vencimento, setData_vencimento ] = useState(null);

    useEffect(() => {
        async function visualizarPagar() {
            await PagarController.findById(route.params.paramskey)
                .then(async res => {
                    setValor(res.valor.toFixed(2));
                    setObservacoes(res.observacoes);
                    res.pago ? setPago("Sim") : setPago("Não");
                    res.parcelamento ? setParcelamento("Sim") : setParcelamento("Não");
                    setForma_pagamento(res.forma_pagamento);
                    setData_entrada(new Date(res.data_entrada).toLocaleString().substring(0, 10));
                    res.data_vencimento ? setData_vencimento(new Date(res.data_vencimento).toLocaleString().substring(0, 10)) : null;
                    res.data_pagamento ? setData_pagamento(new Date(res.data_pagamento).toLocaleString().substring(0, 10)) : null;
                    setParcela(res.parcelas);
                    let setaCategoria = await CategoriaController.findById(res.categoria_id);
                    setCategoria(setaCategoria.titulo);
                    let setaFornecedor = await FornecedorController.findById(res.fornecedor_id);
                    setFornecedor(setaFornecedor.name);
                    res.fixa ? setFixa("Fixa") : setFixa("Variável");
                    console.log("findById", res);
                })
        }

        visualizarPagar();
    }, [])

    function voltar() {
        navigation.navigate("PagarStack");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Dados da Despesa</Text>
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
                        <Text style={styles.visualizarPagarText}>Despesa está paga: {pago}</Text>
                        <Text style={styles.visualizarPagarText}>Despesa é fixa ou variável: {fixa}</Text>
                        <Text style={styles.visualizarPagarText}>Data de pagamento: {data_pagamento}</Text>
                        <Text style={styles.visualizarPagarText}>Despesa está parcelada: {parcelamento}</Text>
                        <Text style={styles.visualizarPagarText}>Categoria: {categoria}</Text>
                        <Text style={styles.visualizarPagarText}>Fornecedor: {fornecedor}</Text>
                        <Text style={styles.visualizarPagarText}>Forma de Pagamento: {forma_pagamento}</Text>
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