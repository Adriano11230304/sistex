import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../store/auth'


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {
    state: { signed },
  } = useAuth();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {signed ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Notifications" component={Notifications} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;