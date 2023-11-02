import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import PagarController from '../../controllers/PagarController';
import FornecedorController from '../../controllers/FornecedorController';
import { useEffect } from 'react';
import Pagar from '../../models/Pagar';
import db from '../../models/configDatabase'

export default function ContasPagar() {
    useEffect(() => {
        async function teste(){
            console.log('teste pagar');
            const conta = new Pagar(3.45, "teste", 0, true, "aluguel", 1, "dssdf", "csdcsd", false, "dscsdc");

            try{
                console.log("entrou");
                await conta.create();
                console.log("Conta adicionada");
            }catch(err){
                console.log(err);
            }
            console.log(await Pagar.findAll());

        }

        teste();
    })

    return (
        <View style={styles.container}>
            <Header />
            <Text>Página Pagar</Text>
        </View>
    );
}