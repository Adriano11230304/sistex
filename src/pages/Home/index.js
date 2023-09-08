import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { store, user } from '../../store';

export default function Home() {
    console.log(store.getState().user);

    return (
        <View style={styles.container}>
            <Header name="Adriano Pereira"/>
            <Text>Página Home</Text>
        </View>
    );
}