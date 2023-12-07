import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import ClienteController from '../../controllers/ClienteController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { clienteValidate } from '../../controllers/utils/validators';

export default function EditClientes({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [cnpj, setCnpj] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        syncCliente();
    }, []);

    async function syncCliente() {
        const cli = await ClienteController.findById(route.params.paramskey);
        setNome(cli.name);
        setEmail(cli.email);
        setCnpj(cli.cnpj);
    }

    const addCliente = async () => {
        setLoading(true);
        const validatecli = {
            "name": nome,
            "email": email,
            "cnpj": cnpj
        }
        const teste = await clienteValidate(validatecli);
        if (teste.isValid) {
            const cliente = await ClienteController.findById(route.params.paramskey);
            const clienteUpdate = await ClienteController.update(nome, email, cnpj, cliente.id);
            ToastAndroid.show("Cliente atualizado com sucesso!", ToastAndroid.SHORT);
            const action = {
                "type": "atualizarClientes",
                "clientes": await ClienteController.listAll(1)
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('ClienteStack');
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
                        <Text style={styles.text}>Editar cliente</Text>
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
                            <TouchableOpacity style={styles.salvarUpdate} onPress={addCliente}>
                                <Text style={styles.salvarTextUpdate}>Atualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.salvarUpdate2} onPress={() => { navigation.navigate("ClienteStack") }}>
                                <Text style={styles.salvarTextUpdate}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}

        </SafeAreaView>
    );
}