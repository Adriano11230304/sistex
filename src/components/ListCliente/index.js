import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

export const ClienteCard = ({ name, cnpj, id, visualizar, edit, del }) => {

    return (
        <TouchableOpacity style={styles.itemList} onPress={() => visualizar(id)}>
            <View style={styles.list}>
                <Text style={styles.textList}>{name}</Text>
                <Text style={styles.textList}>{cnpj ? cnpj : "CNPJ/CPF não informado"}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => edit(id)}><Text style={styles.buttonText}><AntDesign name="edit" size={24} color="black" /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => del(id)}><Text style={styles.buttonText}><MaterialCommunityIcons name="delete" size={24} color="black" /></Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};