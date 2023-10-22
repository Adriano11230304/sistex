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

export default function AddFornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [ nome, setNome ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ cnpj, setCnpj ] = useState(null);
    const [loading, setLoading] = useState(false);

    const addFornecedor = async () => {
        setLoading(true);
        const validateforn = {
            "name": nome,
            "email": email
        }
        const teste = await fornecedorValidate(validateforn);
        if(teste.isValid){
            const forn = await FornecedorController.add(nome, email, cnpj);
            ToastAndroid.show("Fornecedor adicionado com sucesso!", ToastAndroid.SHORT);
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": await FornecedorController.listAll()
            }
            dispatch(action);
            setLoading(false);
            navigation.navigate('FornecedoresStack', '1');
        }else{
            ToastAndroid.show(teste.validate, ToastAndroid.SHORT);
            setLoading(false);
        }
        
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
                        <TouchableOpacity style={styles.salvar} onPress={addFornecedor}>
                            <Text style={styles.salvarText}>Salvar</Text>
                        </TouchableOpacity>
                            {/*<Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                            >
                                <View style={styles.modalCenteredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalTitle}>Erros:</Text>
                                        <FlatList 
                                            showsVerticalScrollIndicator={false}
                                            data={errors}
                                            renderItem={({ item }) =>
                                                <View>
                                                    <View>
                                                        <Text style={styles.modalText}>{item}</Text>
                                                    </View>
                                                </View>
                                            }
                                        />
                                        <TouchableOpacity style={styles.modalSalvar}
                                            onPress={() => setModalVisible(false)}>
                                            <Text style={styles.salvarText}>Voltar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                        </Modal>*/}
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
}