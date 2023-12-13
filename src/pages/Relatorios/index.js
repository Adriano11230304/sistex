import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme, VictoryGroup } from 'victory-native'
import {useAuth} from '../../store/auth';
import SelectDropdown from 'react-native-select-dropdown';
import { useEffect, useState } from 'react';
import LoaderSimple from '../../components/LoaderSimple';
import { atualizarRel, atualizarRelatoriostotais } from '../../controllers/utils/functions';

export default function Relatorios() {
    const date = Date.now();
    const dataatual = new Date(date).toLocaleString().substring(3, 10);
    const {state, dispatch} = useAuth();
    const [ mesAnterior, setMesAnterior ] = useState([]);
    const [ mesAtual, setMesAtual ] = useState([]);

    useEffect(() => {
        setandoMesanterior();
    }, [state.selectedRelatorios])
    
    const countries = ["01/2023", "02/2023", "03/2023", "04/2023", "05/2023", "06/2023", "07/2023", "08/2023", "09/2023", "10/2023", "11/2023", "12/2023", "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024", "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024", "01/2025", "02/2025", "03/2025", "04/2025", "05/2025", "06/2025", "07/2025", "08/2025", "09/2025", "10/2025", "11/2025", "12/2025"]
    let defaultValue;
    countries.map(count => {
        if (dataatual == count) {
            defaultValue = dataatual
        }
    })
    const dataPagar = [
        {
            "x": "Totais",
            "y": parseFloat(state.valorTotalDespesasNoPageRel.somaTotal)
        },
        {
            "y": parseFloat(state.valorTotalDespesasNoPageRel.somaPagas),
            "x": 'Desp Pagas'
        },
        {
            "y": parseFloat(state.valorTotalDespesasNoPageRel.somaNaoPagas),
            "x": 'Desp Não Pagas'
        }
    ]

    const dataReceitas = [
        {
            "x": "Rec totais",
            "y": parseFloat(state.valorTotalReceitasNoPageRel.somaTotal)

        },
        {
            "x": "Rec. recebidas",
            "y": parseFloat(state.valorTotalReceitasNoPageRel.somaRecebidas)
        },
        {
            "x": "Rec não rec",
            "y": parseFloat(state.valorTotalReceitasNoPageRel.somaNaoRecebidas)
        }
    ]

    let nao = parseFloat(state.valorTotalReceitasNoPageRel.somaNaoRecebidas) - parseFloat(state.valorTotalDespesasNoPageRel.somaNaoPagas);
    let efet = parseFloat(state.valorTotalReceitasNoPageRel.somaRecebidas) - parseFloat(state.valorTotalDespesasNoPageRel.somaPagas);

    let dadosgerais = [
        [{ x: "Total", y: parseFloat(state.valorTotalReceitasNoPageRel.somaTotal) }, { x: "efetivadas", y: parseFloat(state.valorTotalReceitasNoPageRel.somaRecebidas) }, { x: "não efetiv.", y: parseFloat(state.valorTotalReceitasNoPageRel.somaNaoRecebidas) }],
        [{ x: "Total", y: parseFloat(state.valorTotalDespesasNoPageRel.somaTotal) }, { x: "efetivadas", y: parseFloat(state.valorTotalDespesasNoPageRel.somaPagas) }, { x: "não efetiv.", y: parseFloat(state.valorTotalDespesasNoPageRel.somaNaoPagas) }],
        [{ x: "Total", y: parseFloat(state.balancoRel) }, { x: "efetivadas", y: efet }, { x: "não efetiv.", y: nao }],
    ]
    async function setandoMesanterior(){
        let mesanterior = parseInt(state.selectedRelatorios.substring(0,2)) - 1;
        if(mesanterior < 1){
            mesanterior = 1;
        }

        mesanterior = mesanterior + state.selectedRelatorios.substring(2,8);
        const dadosMesesAnteriores = await atualizarRelatoriostotais(mesanterior);
        setMesAnterior(dadosMesesAnteriores);

        
    }


    useEffect(() => {
        atualizarDespesasReceitas();
    }, [ state.selectedRelatorios ])


    async function atualizarDespesasReceitas() {
        dispatch({ "type": "loading" });
        await atualizarRel(state.selectedRelatorios, dispatch);
        dispatch({ "type": "loadingfalse" });
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
            <View>
                <Header/>
                <View style={styles.title}>
                <Text style={styles.text}>Relatórios</Text>
            </View>
            </View>
            <View style={styles.select}>
                <SelectDropdown
                    buttonStyle={styles.selected}
                    defaultValue={defaultValue}
                    data={countries}
                    onSelect={(selectedItem, index) => { dispatch({"type": "selectedRelatorios", "selectedRelatorios": selectedItem}) }}
                />
            </View>
            {state.loading ?
                <>
                    <LoaderSimple />
                </>
                :
                <>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.grafico}>
                        <View>
                            <Text style={styles.balancoText}>Receitas e Despesas mensais</Text>
                            <VictoryChart height={250} width={350} theme={VictoryTheme.material}>
                                <VictoryGroup offset={20}
                                    colorScale={"qualitative"}
                                    scale={{x: "log", y: "log"}}
                                >
                                    <VictoryBar
                                        data={dadosgerais[0]}
                                    />
                                    <VictoryBar
                                        data={dadosgerais[1]}
                                    />
                                    <VictoryBar
                                        data={dadosgerais[2]}
                                    />
                                </VictoryGroup>
                            </VictoryChart>
                        </View>
                        <View>
                        <Text style={styles.balancoText}>Despesas em Gráfico de Pizza</Text>
                        <VictoryPie domainPadding={{ x: 20 }} height={250} width={350} theme={VictoryTheme.material}
                            data={dataPagar}
                        />
                        </View>
                        <View>
                        <Text style={styles.balancoText}>Receitas em Gráfico de Pizza</Text>
                        <VictoryPie domainPadding={{ x: 20 }} height={250} width={350} theme={VictoryTheme.material}
                            data={dataReceitas}
                        />
                        </View>
                    </ScrollView>
                </>
            }
            
        </View>
        </View>
    );
}