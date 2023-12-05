import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { useEffect, useState } from 'react';
import {useAuth} from '../../store/auth';
import UserController from '../../controllers/UserController';
import PagarController from '../../controllers/PagarController';
import ReceberController from '../../controllers/ReceberController';
import SelectDropdown from 'react-native-select-dropdown';
import { totalDespesasSeparadas, totalReceitasSeparadas } from '../../controllers/utils/functions';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native'
import LoaderSimple from '../../components/LoaderSimple';

export default function Home({ navigation }) {
    const {state, dispatch} = useAuth();
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
    const [somaDespesasTotal, setSomaDespesasTotal] = useState(0);
    const [somaTotalFixas, setSomaTotalFixas] = useState(0);
    const [somaTotalVariaveis, setSomaTotalVariaveis] = useState(0);
    const [ somaPagas, setSomaPagas] = useState(0);
    const [somaNaoPagas, setSomaNaoPagas] = useState(0);
    const [recebidas, setRecebidas] = useState(0);
    const [naoRecebidas, setNaoRecebidas] = useState(0);
    const [ somaTotalReceitas, setSomaTotalReceitas ] = useState(0);
    const [ saldo, setSaldo ] = useState(0);
    const [selected, setSelected] = useState(dataatual);
    const [balanco, setBalanco] = useState(0);
    const countries = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023", "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023", "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024", "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024", "01/2025", "02/2025", "03/2025", "04/2025", "05/2025", "06/2025", "07/2025", "08/2025", "09/2025", "10/2025", "11/2025", "12/2025"]
    let defaultValue;
    countries.map(count => {
        if (dataatual == count) {
            defaultValue = dataatual
        }
    })

    const dataPagar = [
        {
            "x": "Desp Total",
            "y": parseFloat(somaDespesasTotal)
        },
        {
            "y": parseFloat(somaPagas),
            "x": 'Desp Pagas'
        },
        {
            "y": parseFloat(somaNaoPagas),
            "x": 'Desp Não Pagas'
        }
    ]

    const dataReceitas = [
        {
            "x": "Rec totais",
            "y": parseFloat(somaTotalReceitas)

        },
        {
            "x": "Rec. recebidas",
            "y": parseFloat(recebidas)
        },
        {
            "x": "Rec não rec",
            "y": parseFloat(naoRecebidas)
        }
    ]

    async function atualizarDespesasReceitas(){
        dispatch({"type": "loading"});
        let mesfim = 1 + parseInt(selected.substring(0, 2));
        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
        const despesas = await PagarController.listAllNoPage(datainicio, datafim);
        const receitas = await ReceberController.listAllNoPage(datainicio, datafim);
        const totDespesas = totalDespesasSeparadas(despesas);
        const totReceitas = totalReceitasSeparadas(receitas);
        setSomaDespesasTotal(totDespesas.somaTotal);
        setSomaPagas(totDespesas.somaPagas);
        setSomaNaoPagas(totDespesas.somaNaoPagas);
        setSomaTotalFixas(totDespesas.somaTotalFixas);
        setSomaTotalVariaveis(totDespesas.somaTotalVariaveis);
        setRecebidas(totReceitas.somaRecebidas);
        setNaoRecebidas(totReceitas.somaNaoRecebidas);
        setSomaTotalReceitas(totReceitas.somaTotal);
        const bal = (totReceitas.somaTotal - totDespesas.somaTotal).toFixed(2);
        setBalanco(bal);
        const sal = (totReceitas.somaRecebidas - totDespesas.somaPagas).toFixed(2);
        setSaldo(sal);
        dispatch({ "type": "loadingfalse" });
    }

    useEffect(() => {
        atualizarDespesasReceitas();
    }, [selected])
    

    return (
        <View style={styles.container}>
            <View>
                <Header/>
                <Text style={styles.textHome}>Seja Bem-vindo {state.user.name}!</Text>
            </View>
            <View style={styles.select}>
                <SelectDropdown
                    buttonStyle={styles.selected}
                    defaultValue={defaultValue}
                    data={countries}
                    onSelect={(selectedItem, index) => { setSelected(selectedItem); }}
                />
            </View>
            {state.loading ?
                <>
                    <LoaderSimple />
                </>
                :
                <>
            <View style={styles.contas}>
                <View style={styles.viewPagar}>
                    <Text style={styles.contasPagarTitle}>Despesas</Text>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Totais</Text>
                        <Text style={styles.valorPagar}>R$ {somaDespesasTotal}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Fixas</Text>
                        <Text style={styles.valorPagar}>R$ {somaTotalFixas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Variáveis</Text>
                        <Text style={styles.valorPagar}>R$ {somaTotalVariaveis}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Pagas</Text>
                        <Text style={styles.valorPagar}>R$ {somaPagas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Não Pagas</Text>
                        <Text style={styles.valorPagar}>R$ {somaNaoPagas}</Text>
                    </View>
                </View>
                <View style={styles.viewReceber}>
                    <Text style={styles.contasReceberTitle}>Receitas</Text>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Não rec.</Text>
                        <Text style={styles.valorPagar}>R$ {naoRecebidas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Receb.</Text>
                        <Text style={styles.valorPagar}>R$ {recebidas}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.balanco}><Text style={styles.balancoText}>Balanço Mensal R$ {balanco}</Text></View>
            <View style={styles.balanco}><Text style={styles.balancoText}>Saldo em caixa R$ {saldo}</Text></View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.grafico}>
                        <View>
                            <Text style={styles.balancoText}>Despesas</Text>
                            <VictoryChart domainPadding={{ x: 20 }} height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryBar data={dataPagar} x="x" y="y" />
                            </VictoryChart>
                        </View>
                        <View>
                            <Text style={styles.balancoText}>Receitas</Text>
                            <VictoryChart domainPadding={{ x: 20 }} height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryBar data={dataReceitas} x="x" y="y" />
                            </VictoryChart>
                        </View>
                    </ScrollView>
                </>
            }
            
        </View>
    );
}