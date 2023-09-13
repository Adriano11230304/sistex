import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { useAuth } from '../../store/auth';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Header name="Adriano Pereira"/>
            <Text>Página Home</Text>
            <TouchableOpacity>
                <Text>Notifications</Text>
            </TouchableOpacity>
        </View>
    );
}