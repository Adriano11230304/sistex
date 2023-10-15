import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/auth';
import AddFornecedores from '../pages/Fornecedores/add';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeStack' screenOptions={{headerShown: false}}>
        <Stack.Screen  name="HomeStack" component={Home} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddFornecedor" component={AddFornecedores} />
    </Stack.Navigator>
  );
};

export default AuthStack;