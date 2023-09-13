import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './style';
import UserController from '../../controllers/UserController';
import User from '../../models/User';
import { useAuth } from '../../store/auth'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAuth();
  
  async function Sigin() {
    
    const users = await UserController.findUser(email, password);
      if (users) {
        action = {
          type: "signIn"
        }
        dispatch(action)
      }
  }

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
          <TextInput
            style={styles.input} 
            placeholder='Digite o seu e-mail'
            onChangeText={setEmail} 
            value={email}
          />
        </View>
        <View>
          <Text style={styles.title}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Digite a sua senha' 
            onChangeText={setPassword}
            value={password} 
          />
        </View>
          <TouchableOpacity onPress={Sigin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        <View style={styles.nowRegister}>
          <Text style={styles.textNowRegister}>Não possui um registro?</Text>
          <TouchableOpacity>
            <Text style={styles.register}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;