import { Text, View, Button, Alert, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { styles } from './style';
import { useEffect, useState } from 'react';
import {useAuth} from '../../store/auth';
import UserController from '../../controllers/UserController';
import PagarController from '../../controllers/PagarController';
import ReceberController from '../../controllers/ReceberController';
import SelectDropdown from 'react-native-select-dropdown';
import { atualizarHome, atualizarValoresDespesas } from '../../controllers/utils/functions';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme, VictoryGroup } from 'victory-native'
import LoaderSimple from '../../components/LoaderSimple';

export default function Home({ navigation }) {
    const {state, dispatch} = useAuth();
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
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

    const nao = parseFloat(state.valorTotalReceitasNoPage.somaNaoRecebidas) - parseFloat(state.valorTotalDespesasNoPage.somaNaoPagas);
    const efet = parseFloat(state.valorTotalReceitasNoPage.somaRecebidas) - parseFloat(state.valorTotalDespesasNoPage.somaPagas);

    const dadosgerais = [
        [{ x: "Total", y: parseFloat(state.valorTotalReceitasNoPage.somaTotal) }, { x: "efetivadas", y: parseFloat(state.valorTotalReceitasNoPage.somaRecebidas) }, { x: "não efetiv.", y: parseFloat(state.valorTotalReceitasNoPage.somaNaoRecebidas) }],
        [{ x: "Total", y: parseFloat(state.valorTotalDespesasNoPage.somaTotal) }, { x: "efetivadas", y: parseFloat(state.valorTotalDespesasNoPage.somaPagas) }, { x: "não efetiv.", y: parseFloat(state.valorTotalDespesasNoPage.somaNaoPagas) }],
        [{ x: "Total", y: parseFloat(state.balanco) }, { x: "efetivadas", y: efet }, { x: "não efetiv.", y: nao }],
    ]



    useEffect(() => {
        atualizarDespesasReceitas();
    }, [state.selected])

    async function atualizarDespesasReceitas(){
        dispatch({"type": "loading"});
        await atualizarHome(state.selected, dispatch);
        await atualizarValoresDespesas(1, state.selectedDespesas, dispatch, false, false);
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
                            <Text style={styles.contasReceber}>Totais</Text>
                            <Text style={styles.valorPagar}>R$ {state.valorTotalReceitasNoPage.somaTotal}</Text>
                        </View>
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
                        <Text style={styles.balancoText}>Valores Gerais</Text>
                            <VictoryChart height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryGroup offset={20}
                                    colorScale={"qualitative"}
                                    scale={{x: "log", y: "log"}}
                                >
                                    <VictoryBar
                                        data={dadosgerais[0]}
                                        style={{ data: { fill: "green" } }}
                                    />
                                    <VictoryBar
                                        data={dadosgerais[1]}
                                        style={{ data: { fill: "#c43a31" } }}
                                    />
                                    <VictoryBar
                                        data={dadosgerais[2]}
                                        style={{ data: { fill: "black" } }}
                                    />
                                </VictoryGroup>
                            </VictoryChart>

                        </View>
                    </ScrollView>
                </>
            }
            
        </View>
    );
}