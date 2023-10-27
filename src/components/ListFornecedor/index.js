import React, {memo} from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

const FornecedorCard = (props) => {
        return (
            <TouchableOpacity style={styles.itemList} onPress={() => visualizar(item.id)}>
                <View style={styles.list}>
                    <Text style={styles.textList}>{props.item.name}</Text>
                    <Text style={styles.textList}>{props.item.cnpj ? props.item.cnpj : "CNPJ/CPF não informado"}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => editFornecedor(props.item.id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteFornecedor(props.item.id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };
    
 export default memo(FornecedorCard);