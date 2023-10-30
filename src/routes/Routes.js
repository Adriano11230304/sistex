import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/auth';
import AddFornecedores from '../pages/Fornecedores/add';
import Fornecedores from '../pages/Fornecedores';
import VisFornecedor from '../pages/Fornecedores/visualizar';


const Stack = createNativeStackNavigator();

export const FornecedorStack = () => {
  return (
    <Stack.Navigator initialRouteName='FornecedoresStack' screenOptions={{headerShown: false}}>
        <Stack.Screen name="FornecedoresStack" component={Fornecedores} />
      <Stack.Screen name="AddFornecedor" component={AddFornecedores} />
      <Stack.Screen name="VisFornecedor" component={VisFornecedor} />
    </Stack.Navigator>
  );
};