import { Provider } from 'react-redux';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store, user } from './src/store';
import Login from './src/pages/Login';
import Loading from './src/pages/Loading';
import { useEffect, useState, useMemo } from 'react';

const Stack = createNativeStackNavigator();

export default function App({ navigation }, ...props) {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Login" component={Login} />
            
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}