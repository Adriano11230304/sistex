import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <View>
                <Header/>
                <Text style={styles.textHome}>Olá, Adriano!</Text>
            </View>
            <View style={styles.contas}>
                <View style={styles.viewPagar}>
                    <Text style={styles.contasPagar}>Pagar</Text>
                    <Text style={styles.valorPagar}>R$ 345,00</Text>
                </View>
                <View style={styles.viewReceber}>
                    <Text style={styles.contasReceber}>Receber</Text>
                    <Text style={styles.valorReceber}>R$ 645,00</Text>
                </View>
            </View>
        </View>
    );
}