import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { styles } from './style';
// import { useAuth } from '../../store/auth'
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();


const Login = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const { state, dispatch } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1099078308735-87979lob5dicr95qfhkas7i0dm5pbpd6.apps.googleusercontent.com", 
    redirectUri: makeRedirectUri({ scheme: "com.adriano11230304.sistex" }),
    ...{useProxy: true}
  });

  useEffect(() => {
    console.log(response);
  }, [response])
  
  async function Sigin() {
    console.log("login");
    promptAsync();
    /*const users = true;
      if (users) {
        action = {
          type: "signIn",
          user: users
        }
        dispatch(action)
      }*/
  }

  const getUserInfo = async () => {
    if(response) {
      switch(response.type){
        case "error":
          console.log('Houve um erro!');
          break;
        case "cancel":
          console.log('Login Cancelado!');
          break;
        case "success":
          try {
            const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
              headers: {
                Authorization: `Bearer ${response.authentication?.accesstoken}`,
              },
            });

            const userLogin = await res.json();
            console.log(await userLogin);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          () => {};
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [response])

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
            <Image style={styles.image}
              source={require('../../../assets/google.png')}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;