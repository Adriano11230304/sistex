import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { styles } from './style';
import { useAuth } from '../../store/auth'
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import UserController from '../../controllers/UserController';
import User from '../../models/User';


WebBrowser.maybeCompleteAuthSession();


const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(true);
  const { state, dispatch } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1099078308735-87979lob5dicr95qfhkas7i0dm5pbpd6.apps.googleusercontent.com", 
    redirectUri: makeRedirectUri({ scheme: "com.adriano11230304.sistex" }),
    ...{useProxy: true}
  });

  useEffect(() => {
    handleSingInWithGoogle();
  }, [response]);

  useEffect(() => {
    async function usersData() {
      if(!state.signed){
        const users = await UserController.listAll();
        const action = {
          "type": "signIn",
          "user": users[0]
        }

        dispatch(action);
      }
      
    }

    usersData();
    setLoader(false);
  }, []);

  async function Sigin(){
    const users = await UserController.listAll();
    if(users.length == 0){
      promptAsync();
    }else{
      console.log(state.signed);
      console.log("Você já possui um usuário cadastrado, limpe as credenciais e faça o login novamente!");
    }
    
  }

  

  async function handleSingInWithGoogle(){
    if(response?.type === 'success'){
      await getUserInfo(response.authentication.accessToken);
    }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try{
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );

      const user = await response.json();
      console.log(user);
      await UserController.add(user.email, user.verified_email, user.given_name, user.picture, user.id);
    }catch (error){
      console.log(error);
    }
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
            <Image style={styles.image}
              source={require('../../../assets/google.png')}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;