import React, {memo} from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import VisFornecedor from '../../pages/Fornecedores/visualizar';

const FornecedorCard = ({item, navigation}) => {
    const { state, dispatch } = useAuth();
    const editFornecedor = async (id) => {
        console.log(`editar o fornenecedor de id ${id}`);
    }

    const deleteFornecedor = async (id) => {
        dispatch({"type": "loading"})
        const deleteForn = await FornecedorController.remove(id);
        ToastAndroid.show(deleteForn, ToastAndroid.SHORT);
        const action = {
            "type": "atualizarFornecedores",
            "fornecedores": await FornecedorController.listAll(10, 0)
          }

          dispatch(action);

          dispatch({"type": "loadingfalse"})

          
    }

    async function visualizar(id){
        navigation.navigate('VisFornecedor')
    }

        return (
            <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
                <View style={styles.list}>
                    <Text style={styles.textList}>{item.name}</Text>
                    <Text style={styles.textList}>{item.cnpj ? item.cnpj : "CNPJ/CPF não informado"}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => editFornecedor(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteFornecedor(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };
    
 export default memo(FornecedorCard);