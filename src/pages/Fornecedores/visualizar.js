import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import LoaderSimple from '../../components/LoaderSimple';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';

export default function VisFornecedor({navigation, route}){

return (
    <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.title}>
            <Text style={styles.text}>Fornecedores</Text>
        </View>
        {state.loading ? (
            <>
                <LoaderSimple />
            </>
        ) : (
            <>
               <Text>visualizar fornecedor</Text>
            </>
        )}

    </SafeAreaView>
)}