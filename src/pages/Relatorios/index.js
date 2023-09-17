import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'

export default function Relatorios() {
    return (
        <View style={styles.container}>
            <Header />
            <Text>Relatorios</Text>
        </View>
    );
}