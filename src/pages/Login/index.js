import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import { styles } from './style';
import { useAuth } from '../../store/auth'
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import UserPersistence from '../../persistence/UserPersistence';
import User from '../../models/User';


WebBrowser.maybeCompleteAuthSession();


const Login = ({ navigation }) => {
  const { state, dispatch } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1099078308735-87979lob5dicr95qfhkas7i0dm5pbpd6.apps.googleusercontent.com", 
    redirectUri: makeRedirectUri({ scheme: "com.adriano11230304.sistex" }),
    ...{useProxy: true}
  });

  useEffect(() => {
    handleSingInWithGoogle();
  }, [response]);

  useEffect(() => {
    usersData();
  });

  async function usersData(){
    const users = await UserPersistence.findAll();
    const d = 1;
    console.log(users);
  }

  async function handleSingInWithGoogle(){
    const user = null;
    if(!user){

      if(response?.type === 'success'){
        await getUserInfo(response.authentication.accessToken);
      }
      
    } else{
      setUserInfo(JSON.parse(user));
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
      console.log(user.given_name);
      console.log(user.email);
      console.log(user.verified_email);
      console.log(user.picture);
      console.log(user.id);
      
      const userBanco = new User(user.email, user.verified_email, user.given_name, user.picture, user.id_gmail);
      UserPersistence.create(userBanco)
        .then(() => console.log('Car created with id: '))
        .catch(err => console.log(err))
      setUserInfo(user);
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
        <TouchableOpacity onPress={() => promptAsync()} style={styles.button}>
            <Image style={styles.image}
              source={require('../../../assets/google.png')}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;