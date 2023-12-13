import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { fornecedorValidate } from '../../controllers/utils/validators';

export default function EditFornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [cnpj, setCnpj] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        syncForn();
    }, []);

    async function syncForn(){
        const forn = await FornecedorController.findById(route.params.paramskey);
        setNome(forn.name);
        setEmail(forn.email);
        setCnpj(forn.cnpj);
    }

    const addFornecedor = async () => {
        setLoading(true);
        const validateforn = {
            "name": nome,
            "email": email,
            "cnpj": cnpj
        }
        const teste = await fornecedorValidate(validateforn);
        if (teste.isValid) {
            const fornecedor = await FornecedorController.findById(route.params.paramskey);
            const forn = await FornecedorController.update(nome, email, cnpj, fornecedor.id);
            ToastAndroid.show("Fornecedor atualizado com sucesso!", ToastAndroid.SHORT);
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": await FornecedorController.listAll(1)
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('FornecedoresStack');
        } else {
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }
        setLoading(false);

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
                        <Text style={styles.text}>Editar fornecedor</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Nome:</Text>
                            <TextInput style={styles.inputadd} value={nome} placeholder='Adicione o nome' placeholderTextColor="#888" onChangeText={(t) => setNome(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>E-mail:</Text>
                            <TextInput style={styles.inputadd} value={email} placeholder='Adicione o e-mail' placeholderTextColor="#888" onChangeText={(t) => setEmail(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>CNPJ/CPF:</Text>
                            <TextInput keyboardType='numeric' value={cnpj} style={styles.inputadd} placeholder='Adicione o cnpj ou CPF' placeholderTextColor="#888" onChangeText={(t) => setCnpj(t)}></TextInput>
                        </View>
                        <View style={styles.buttonupdatevoltar}>
                            <TouchableOpacity style={styles.salvarUpdate} onPress={addFornecedor}>
                                <Text style={styles.salvarTextUpdate}>Atualizar</Text>
                            </TouchableOpacity>
                                <TouchableOpacity style={styles.salvarUpdate2} onPress={() => { navigation.navigate("FornecedoresStack")}}>
                                <Text style={styles.salvarTextUpdate}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}