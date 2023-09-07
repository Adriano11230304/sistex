import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './style'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text
          style={styles.login}>
          Faça o seu Login
        </Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.title}>E-mail</Text>
          <TextInput style={styles.input} placeholder='Digite o seu e-mail'/>
        </View>
        <View>
          <Text style={styles.title}>Password</Text>
          <TextInput style={styles.input} placeholder='Digite a sua senha' />
        </View>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        <View style={styles.nowRegister}>
          <Text style={styles.textNowRegister}>Não possui um registro?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.register}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;