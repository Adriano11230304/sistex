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
        setLoading(true);
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
        setLoading(false)
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
        setLoading(true);
        const deleteForn = await FornecedorController.remove(id);
        ToastAndroid.show(deleteForn, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarFornecedores",
            "fornecedores": await FornecedorController.listAll()
          }

          dispatch(action);

          setLoading(false);
    }

    const editFornecedor = async (id) => {
        console.log(`editar o fornenecedor de id ${id}`);
    }

    const addFornecedores = async () => {
        navigation.navigate('AddFornecedor');
    }

    const setText = (t) => {
        console.log("setText");
        setSearchText(t)
    }


    return (
        <List list={state.fornecedores} edit={editFornecedor} del={deleteFornecedor} add={addFornecedores} loading={loading} searchText={searchText} setText={setText} textInput={"Digite nome, email ou CNPJ/CPF"} title={"Fornecedores"} />
    );
}