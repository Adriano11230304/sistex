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
    webClientId: "1099078308735-mmsolhd675dile5m6tt3ta01bjapodp0.apps.googleusercontent.com",
    expoClientId: "1099078308735-uf7i6v75ce2p5551hmqljb6chd74tau9.apps.googleusercontent.com",
    androidClientId: "1099078308735-7ak00a0clhai3m0bs4d4qccrduljif4u.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({ native: "com.anonymous.sistex://"}),
    ...{useProxy: true}
  });
  
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