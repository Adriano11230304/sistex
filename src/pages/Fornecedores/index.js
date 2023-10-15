import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

export default function Fornecedores({ navigation }) {
    const [fornecedores, setFornecedores] = useState(null);
    const [searchText, setSearchText] = useState(null);
    useEffect(() => {
        const listFornecedores = async () => {
            const fornec = await FornecedorController.listAll();
            setFornecedores(fornec);
        }

        listFornecedores();

        
    }, [])

    useEffect(() => {
        handleOrderClick();
    }, [searchText])

    const handleOrderClick = async () => {
        let newList = null;
        if(searchText){
            newList = await FornecedorController.findNameorEmail(searchText);
            setFornecedores(newList);
        }
    };

    const deleteFornecedor = async (id) => {
        console.log(`excluir o fornenecedor de id ${id}`);
    }

    const editFornecedor = async (id) => {
        console.log(`editar o fornenecedor de id ${id}`);
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Fornecedores</Text>
            </View>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise por um fornecedor"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                />
                <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
                    
                </TouchableOpacity>
            </View>
            <FlatList
                data={fornecedores}
                renderItem={({ item }) => 
                    <View style={styles.itemList}>
                        <View style={styles.list}>
                        <Text style={styles.textList}>{item.name}</Text>
                        <Text style={styles.textList}>{item.email}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() => editFornecedor(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteFornecedor(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                        </View>
                    </View>
                    
                }
                keyExtractor={(item) => item.id}
            />

            <View style={styles.buttonAdd}>
                <TouchableOpacity onPress={() => navigation.navigate('AddFornecedor')}>
                    <AntDesign name="pluscircleo" size={50} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}