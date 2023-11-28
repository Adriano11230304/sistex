import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/auth';
import AddFornecedores from '../pages/Fornecedores/add';
import Fornecedores from '../pages/Fornecedores';
import Categorias from '../pages/Categorias';
import VisFornecedor from '../pages/Fornecedores/visualizar';
import EditFornecedores from '../pages/Fornecedores/editar';
import ContasPagar from '../pages/Pagar';
import AddCategoria from '../pages/Categorias/add';
import AddDespesas from '../pages/Pagar/add';
import Receber from '../pages/Receber';
import ContasPagarFixas from '../pages/Pagar/despesasFixas';
import ContasPagarVariaveis from '../pages/Pagar/despesasVariaveis';
import AddDespesasPagamento from '../pages/Pagar/dataPagamento';
import UpdateDespesas from '../pages/Pagar/updatePagar';
import Clientes from '../pages/Clientes';
import AddClientes from '../pages/Clientes/add';
import EditClientes from '../pages/Clientes/editar';
import VisCliente from '../pages/Clientes/visualizar';
import VisPagar from '../pages/Pagar/visualizar';
import AddReceita from '../pages/Receber/add';
import VisReceber from '../pages/Receber/visualizar';
import AddReceitasRecebimento from '../pages/Receber/dataRecebimento';
import UpdateReceita from '../pages/Receber/update';


const Stack = createNativeStackNavigator();

export const FornecedorStack = () => {
  return (
    <Stack.Navigator initialRouteName='FornecedoresStack' screenOptions={{headerShown: false}}>
        <Stack.Screen name="FornecedoresStack" component={Fornecedores} />
      <Stack.Screen name="AddFornecedor" component={AddFornecedores} />
      <Stack.Screen name="VisFornecedor" component={VisFornecedor} />
      <Stack.Screen name="EditFornecedores" component={EditFornecedores} />
    </Stack.Navigator>
  );
};

export const ClienteStack = () => {
  return (
    <Stack.Navigator initialRouteName='ClienteStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClienteStack" component={Clientes} />
      <Stack.Screen name="AddCliente" component={AddClientes} />
      <Stack.Screen name="VisCliente" component={VisCliente} />
      <Stack.Screen name="EditCliente" component={EditClientes} />
    </Stack.Navigator>
  );
};

export const PagarStack = () => {
  return (
    <Stack.Navigator initialRouteName='PagarStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PagarStack" component={ContasPagar} />
      <Stack.Screen name="AddDespesa" component={AddDespesas}/>
      <Stack.Screen name="AddDespesaPagamento" component={AddDespesasPagamento}/>
      <Stack.Screen name="UpdateDespesas" component={UpdateDespesas} />
      <Stack.Screen name="VisPagar" component={VisPagar} />
    </Stack.Navigator>
  );
};

export const PagarFixaStack = () => {
  return (
    <Stack.Navigator initialRouteName='PagarFixaStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PagarFixaStack" component={ContasPagarFixas} />
      <Stack.Screen name="AddDespesa" component={AddDespesas} />
      <Stack.Screen name="AddDespesaPagamento" component={AddDespesasPagamento} />
      <Stack.Screen name="UpdateDespesas" component={UpdateDespesas} />
      <Stack.Screen name="VisPagar" component={VisPagar} />
    </Stack.Navigator>
  );
};

export const PagarVariavelStack = () => {
  return (
    <Stack.Navigator initialRouteName='PagarVariavelStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PagarVariavelStack" component={ContasPagarVariaveis} />
      <Stack.Screen name="AddDespesa" component={AddDespesas} />
      <Stack.Screen name="AddDespesaPagamento" component={AddDespesasPagamento} />
      <Stack.Screen name="UpdateDespesas" component={UpdateDespesas} />
      <Stack.Screen name="VisPagar" component={VisPagar} />
    </Stack.Navigator>
  );
};

export const ReceitasStack = () => {
  return (
    <Stack.Navigator initialRouteName='ReceitaStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReceitaStack" component={Receber} />
      <Stack.Screen name="AddReceita" component={AddReceita} />
      <Stack.Screen name="VisReceber" component={VisReceber} />
      <Stack.Screen name="AddReceitaRecebimento" component={AddReceitasRecebimento} />
      <Stack.Screen name="UpdateReceita" component={UpdateReceita} />
    </Stack.Navigator>
  );
};

export const CategoriaStack = () => {
  return (
    <Stack.Navigator initialRouteName='CategoriasStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriasStack" component={Categorias} />
      <Stack.Screen name="AddCategoria" component={AddCategoria} />
    </Stack.Navigator>
  );
};