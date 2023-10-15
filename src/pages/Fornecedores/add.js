import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function AddFornecedores({ navigation }) {
    const addFornecedor = async () => {
        console.log("Usuário adicionado!");
        navigation.navigate('Fornecedores');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Adicionar um novo fornecedor</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text>Nome:</Text>
                    <TextInput placeholder='Adicione o nome do fornecedor'></TextInput>
                </View>
                <View>
                    <Text>E-mail:</Text>
                    <TextInput placeholder='Adicione o nome do fornecedor'></TextInput>
                </View>
                <View>
                    <Text>CNPJ/CPF:</Text>
                    <TextInput placeholder='Adicione o cnpj ou CPF do fornecedor'></TextInput>
                </View>
                <TouchableOpacity onPress={addFornecedor}>
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}