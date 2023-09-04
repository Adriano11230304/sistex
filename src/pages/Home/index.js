import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'

export default function Home() {
    return (
        <View style={styles.container}>
            <Header name="Adriano Pereira"/>
            <Text>Página Home</Text>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.button}
                onPress={() => Alert.alert("alertando!!")}>
                <Text>Pressione</Text>
            </TouchableOpacity> 
            <Text style={{backgroundColor: '#a9a9a9'}}>sdsdcdscsdcsdc</Text>
        </View>
    );
}