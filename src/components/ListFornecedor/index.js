import React, {memo} from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../store/auth';
import FornecedorController from '../../controllers/FornecedorController';
import VisFornecedor from '../../pages/Fornecedores/visualizar';

const FornecedorCard = ({item, visualizar, edit, del}) => {
    const { state, dispatch } = useAuth();

        return (
            <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
                <View style={styles.list}>
                    <Text style={styles.textList}>{item.name}</Text>
                    <Text style={styles.textList}>{item.cnpj ? item.cnpj : "CNPJ/CPF não informado"}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => edit(item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => del(item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };
    
 export default FornecedorCard;