import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useAuth } from '../../store/auth';
import { useEffect, useState } from 'react';
import FornecedorController from '../../controllers/FornecedorController';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import LoaderSimple from '../../components/LoaderSimple';
import List from '../../components/List'

export default function Fornecedores({ navigation, route }) {
    const { state, dispatch } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const listFornecedores = async () => {
            if(searchText == ""){
                const fornec = await FornecedorController.listAll();
                const action = {
                    "type": "atualizarFornecedores",
                    "fornecedores": fornec
                  }
        
                  dispatch(action);

                console.log("dispatch", state);
            }
        }

        listFornecedores();
        console.log("fornecedoresAdd");
    }, [])

    useEffect(() => {
        handleOrderClick();
        console.log(searchText);
    }, [searchText])

    const handleOrderClick = async () => {
            setLoading(true);
            let newList = null;
            newList = await FornecedorController.findNameorEmail(searchText);
            const action = {
                "type": "atualizarFornecedores",
                "fornecedores": newList
              }
    
              dispatch(action);
              setLoading(false);
    };

    const deleteFornecedor = async (id) => {
        const deleteForn = await FornecedorController.remove(id);
        ToastAndroid.show(deleteForn, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarFornecedores",
            "fornecedores": await FornecedorController.listAll()
          }

          dispatch(action);
    }

    const editFornecedor = async (id) => {
        console.log(`editar o fornenecedor de id ${id}`);
    }

    const addFornecedores = async () => {
        navigation.navigate('AddFornecedor');
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
                <FontAwesome name="search" size={24} color="black" />
            </View>
            {loading ? (
                <>
                    <LoaderSimple/>
                </>
            ) : (
                <>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={state.fornecedores}
                        renderItem={({ item }) => 
                            <View style={styles.itemList}>
                                <View style={styles.list}>
                                    <Text style={styles.textList}>{item.name}</Text>
                                    <Text style={styles.textList}>{item.cnpj}</Text>
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
                        <TouchableOpacity onPress={addFornecedores}>
                            <AntDesign name="pluscircleo" size={50} color="black" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
}