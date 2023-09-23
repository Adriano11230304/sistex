import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './style';
import UserController from '../../controllers/UserController';
import { useAuth } from '../../store/auth'
import { AntDesign } from '@expo/vector-icons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useAuth();
  
  async function Sigin() {
    console.log("login");
    
    /*const users = true;
      if (users) {
        action = {
          type: "signIn",
          user: users
        }
        dispatch(action)
      }*/
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={styles.login}>
          Faça o seu Login
        </Text>
      </View>
      <View style={styles.form}>
          <TouchableOpacity onPress={Sigin} style={styles.button}>
            <AntDesign name="googleplus" size={24} color="black" />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;