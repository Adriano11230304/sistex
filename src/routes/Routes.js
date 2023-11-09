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

export const PagarStack = () => {
  return (
    <Stack.Navigator initialRouteName='PagarStack' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PagarStack" component={ContasPagar} />
      <Stack.Screen name="AddDespesa" component={AddDespesas}/>
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