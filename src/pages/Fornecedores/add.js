import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import { fornecedorValidate } from '../../controllers/utils/validators';

export default function AddFornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [ nome, setNome ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ cnpj, setCnpj ] = useState("CPF/CNPJ não informado");
    const [loading, setLoading] = useState(false);

    const addFornecedor = async () => {
        setLoading(true);
        const validateforn = {
            "name": "csdcsdcds",
            "email": "adrian@gmail.com"
        }
        const teste = await fornecedorValidate(validateforn);
        console.log("teste", teste);
        console.log(nome, email, cnpj);
          // implementar a validação
          
        
            /*const forn = await FornecedorController.add(nome, email, cnpj);
            ToastAndroid.show("Fornecedor adicionado com sucesso!", ToastAndroid.SHORT);
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": await FornecedorController.listAll()
              }
    
              dispatch(action);*/
              setLoading(false);
            // navigation.navigate('FornecedoresStack', '1');
        
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <>
                    <LoaderSimple/>
                </>
            ): (
                <>
                    <Header />
                    <View style={styles.title}>
                        <Text style={styles.text}>Adicionar um novo fornecedor</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>Nome:</Text>
                            <TextInput style={styles.inputadd} placeholder='Adicione o nome' placeholderTextColor="#888" onChangeText={(t) => setNome(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>E-mail:</Text>
                            <TextInput style={styles.inputadd} placeholder='Adicione o e-mail' placeholderTextColor="#888" onChangeText={(t) => setEmail(t)}></TextInput>
                        </View>
                        <View style={styles.labelinput}>
                            <Text style={styles.label}>CNPJ/CPF:</Text>
                            <TextInput keyboardType='numeric' style={styles.inputadd} placeholder='Adicione o cnpj ou CPF' placeholderTextColor="#888" onChangeText={(t) => setCnpj(t)}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.salvar} onPress={addFornecedor}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
}