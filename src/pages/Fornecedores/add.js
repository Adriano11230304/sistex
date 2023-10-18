import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function AddFornecedores({ navigation, route }) {
    const [ nome, setNome ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ cnpj, setCnpj ] = useState("CPF/CNPJ não informado");

    const addFornecedor = async () => {
        if(nome == null){
            ToastAndroid.show("Nome ou Razão Social não foi adicionado!", ToastAndroid.SHORT);
        }else if(email == null){
            ToastAndroid.show("E-mail não foi adicionado!", ToastAndroid.SHORT);
        }else if(!email.includes("@")){
            ToastAndroid.show("E-mail inválido foi adicionado!", ToastAndroid.SHORT);
        }else{
            const forn = await FornecedorController.add(nome, email, cnpj);
            ToastAndroid.show("Fornecedor adicionado com sucesso!", ToastAndroid.SHORT);
            navigation.navigate('FornecedoresStack', '1');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}