import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme } from 'victory-native'
import {useAuth} from '../../store/auth';
import SelectDropdown from 'react-native-select-dropdown';

export default function Relatorios() {

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

    return (
        <View style={styles.container}>
            <View style={styles.container}>
            <View>
                <Header/>
                <Text style={styles.textHome}>Relatórios</Text>
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
        </View>
    );
}