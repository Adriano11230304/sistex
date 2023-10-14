import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'

export default function Clientes() {
    return (
        <View style={styles.container}>
            <Header />
            <Text>Clientes</Text>
        </View>
    );
}