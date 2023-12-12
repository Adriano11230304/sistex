import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { useEffect, useState } from 'react';
import {useAuth} from '../../store/auth';
import UserController from '../../controllers/UserController';
import PagarController from '../../controllers/PagarController';
import ReceberController from '../../controllers/ReceberController';
import SelectDropdown from 'react-native-select-dropdown';
import { totalDespesasSeparadas, totalReceitasSeparadas, despTodosDados, receitasTodosDados, somatorioDespesas, somatorioReceitas } from '../../controllers/utils/functions';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native'
import LoaderSimple from '../../components/LoaderSimple';

export default function Home({ navigation }) {
    const {state, dispatch} = useAuth();
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
    const [selected, setSelected] = useState(dataatual);
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
            "y": parseFloat(state.valorTotalDespesasNoPage.somaTotal)
        },
        {
            "y": parseFloat(state.valorTotalDespesasNoPage.somaPagas),
            "x": 'Desp Pagas'
        },
        {
            "y": parseFloat(state.valorTotalDespesasNoPage.somaNaoPagas),
            "x": 'Desp Não Pagas'
        }
    ]

    const dataReceitas = [
        {
            "x": "Rec totais",
            "y": parseFloat(state.valorTotalReceitasNoPage.somaTotal)

        },
        {
            "x": "Rec. recebidas",
            "y": parseFloat(state.valorTotalReceitasNoPage.somaRecebidas)
        },
        {
            "x": "Rec não rec",
            "y": parseFloat(state.valorTotalReceitasNoPage.somaNaoRecebidas)
        }
    ]

    useEffect(() => {
        atualizarDespesasReceitas();
    }, [state.selected])

    async function atualizarDespesasReceitas(){
        dispatch({"type": "loading"});
        let mesfim = 1 + parseInt(selected.substring(0, 2));
        const datainicio = new Date(selected.substring(3, 8) + "-" + selected.substring(0, 2) + "-01T00:00:00").getTime();
        const datafim = new Date(selected.substring(3, 8) + "-" + mesfim + "-01T00:00:00").getTime();
        const despesastot = await PagarController.listAllNoPage(datainicio, datafim);
        const totDespesasAll = totalDespesasSeparadas(despesastot);
        const despesas = await PagarController.listAll(1, datainicio, datafim, false, false);
        const despesasf = await PagarController.listAllFixas(1, datainicio, datafim, false, false);
        const despesasv = await PagarController.listAllVariaveis(1, datainicio, datafim, false, false);
        dispatch({
            "type": "atualizarDespesas",
            "despesas": await despTodosDados(despesas),
            "valorTotal": somatorioDespesas(despesas),
            "valorTotalDespesasNoPage": totDespesasAll
        })
        dispatch({
            "type": "atualizarDespesasFixas",
            "despesasFixas": await despTodosDados(despesasf),
            "valorTotalFixas": somatorioDespesas(despesasf),
            "valorTotalDespesasNoPage": totDespesasAll
        })
        dispatch({
            "type": "atualizarDespesasVariaveis",
            "despesasVariaveis": await despTodosDados(despesasv),
            "valorTotalVariaveis": somatorioDespesas(despesasv),
            "valorTotalDespesasNoPage": totDespesasAll
        })
        console.log("despesas", state.valorTotalDespesasNoPage);
        const receitas = await ReceberController.listAllNoPage(datainicio, datafim);
        const receitas1 = await ReceberController.listAll(1, datainicio, datafim, false, false);
        dispatch({
            "type": "atualizarReceitas",
            "receitas": await receitasTodosDados(receitas),
            "valorTotal": somatorioReceitas(receitas),
            "valorTotalReceitasNoPage": totalReceitasSeparadas(receitas)
        })
        const totDespesas = totalDespesasSeparadas(despesastot);
        const totReceitas = totalReceitasSeparadas(receitas);
        const bal = (totReceitas.somaTotal - totDespesas.somaTotal);
        dispatch({ "type": "balanco", "balanco": bal.toFixed(2)});
        const sal = (totReceitas.somaRecebidas - totDespesas.somaPagas);
        dispatch({ "type": "saldo", "saldo": sal.toFixed(2)});
        dispatch({ "type": "selected", "selected": selected});
        dispatch({ "type": "loadingfalse" });
    }
    

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
                    onSelect={(selectedItem, index) => { dispatch({"type": "selected", "selected": selectedItem}) }}
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
                        <Text style={styles.valorPagar}>R$ {state.valorTotalDespesasNoPage.somaTotal}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Fixas</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalDespesasNoPage.somaTotalFixas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Variáveis</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalDespesasNoPage.somaTotalVariaveis}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Pagas</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalDespesasNoPage.somaPagas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasPagar}>Não Pagas</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalDespesasNoPage.somaNaoPagas}</Text>
                    </View>
                </View>
                <View style={styles.viewReceber}>
                    <Text style={styles.contasReceberTitle}>Receitas</Text>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Não rec.</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalReceitasNoPage.somaNaoRecebidas}</Text>
                    </View>
                    <View style={styles.viewdespesas}>
                        <Text style={styles.contasReceber}>Receb.</Text>
                        <Text style={styles.valorPagar}>R$ {state.valorTotalReceitasNoPage.somaRecebidas}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.balanco}><Text style={styles.balancoText}>Balanço Mensal R$ {state.balanco}</Text></View>
            <View style={styles.balanco}><Text style={styles.balancoText}>Saldo em caixa R$ {state.saldo}</Text></View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.grafico}>
                        <View>
                            <Text style={styles.balancoText}>Despesas</Text>
                            <VictoryChart domainPadding={{ x: 20 }} height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryBar
                                style={{
                                    data: {
                                        fill: "#c43a31"
                                    }
                                }}
                                data={dataPagar} x="x" y="y" />
                            </VictoryChart>
                        </View>
                        <View>
                            <Text style={styles.balancoText}>Receitas</Text>
                            <VictoryChart domainPadding={20} height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryBar
                                style={{
                                    data: {
                                        fill: "#418452",
                                        width: 25
                                    }
                                }}  
                                data={dataReceitas}
                                />
                            </VictoryChart>
                        </View>
                    </ScrollView>
                </>
            }
            
        </View>
    );
}