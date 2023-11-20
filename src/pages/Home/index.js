import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { useEffect } from 'react';
import SelectHome from '../../components/SelectHome';
import {useAuth} from '../../store/auth';
import UserController from '../../controllers/UserController';

export default function Home({ navigation }) {
    const {state, dispatch} = useAuth();

    useEffect(() => {
        // apagar();
    }, [])

    /*async function apagar(){
        const deleted = await UserController.remove(2);
    }*/

    return (
        <View style={styles.container}>
            <View>
                <Header/>
                <Text style={styles.textHome}>Seja Bem-vindo {state.user.name}!</Text>
            </View>
            <View style={styles.select}>
                <SelectHome/>
            </View>
            <View style={styles.contas}>
                <View style={styles.viewPagar}>
                    <Text style={styles.contasPagarTitle}>Despesas</Text>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Totais</Text>
                        <Text style={styles.valorPagar}>R$ 345,00</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Fixas</Text>
                        <Text style={styles.valorPagar}>R$ 345,00</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Variáveis</Text>
                        <Text style={styles.valorPagar}>R$ 345,00</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Pagas</Text>
                        <Text style={styles.valorPagar}>R$ 345,00</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Não Pagas</Text>
                        <Text style={styles.valorPagar}>R$ 345,00</Text>
                    </View>
                </View>
                <View style={styles.viewReceber}>
                    <Text style={styles.contasReceberTitle}>Receitas</Text>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Não rec.</Text>
                        <Text style={styles.valorPagar}>R$ 645,00</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Receb.</Text>
                        <Text style={styles.valorPagar}>R$ 645,00</Text>
                    </View>
                </View>
            </View>
            <View style={styles.balanco}><Text style={styles.balancoText}>Balanço Mensal R$ 345,00</Text></View>
            <View style={styles.grafico}>
                <Text style={styles.graficoText}>Gráfico</Text>
            </View>
        </View>
    );
}