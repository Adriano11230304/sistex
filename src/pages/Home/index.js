import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'

export default function Home() {
    return (
        <View style={styles.container}>
            <Header name="Adriano Pereira"/>
            <Text>Página Home</Text>
            <StatusBar style="auto" />
        </View>
    );
}