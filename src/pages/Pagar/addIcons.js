import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, Modal, Button } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import PagarController from '../../controllers/PagarController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import SelectDropdown from 'react-native-select-dropdown';

export default function AddDespesasIcons({ navigation, route }) {
    const { state, dispatch } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Escolha uma opção</Text>
            </View>

            <TouchableOpacity style={styles.salvar}><Text style={styles.salvarText}>QR Code</Text></TouchableOpacity>
            <TouchableOpacity style={styles.salvarManualmente} onPress={() => {navigation.navigate("AddDespesa")}}><Text style={styles.salvarText}>Adicionar uma despesa manualmente</Text></TouchableOpacity>
        </SafeAreaView>
    );
}