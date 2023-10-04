import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import UserController from '../../controllers/UserController';
import { useEffect } from 'react';
import SelectHome from '../../components/SelectHome';

export default function Home({ navigation }) {
    
    return (
        <View style={styles.container}>
            <View>
                <Header/>
                <Text style={styles.textHome}>Seja Bem-vindo!</Text>
            </View>
            <View style={styles.select}>
                <SelectHome/>
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
            <View style={styles.grafico}>
                <Text style={styles.graficoText}>Gráfico</Text>
            </View>
        </View>
    );
}