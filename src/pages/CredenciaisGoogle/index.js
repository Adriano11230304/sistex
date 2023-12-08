import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import { styles } from './style'
import { useEffect, useState } from 'react';
import UserController from '../../controllers/UserController';
import { useAuth } from '../../store/auth'

export default function CredenciaisGoogle() {
    const { state, dispatch } = useAuth();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [url, setUrl] = useState(null);
    useEffect(() => {
        atualizar();
        async function atualizar(){
            const user = await UserController.listAll();
            setUrl(user[0].picture)
            setNome(user[0].name)
            setEmail(user[0].email)
        }
    })

    async function apagar(){
        
        const user = await UserController.listAll();
        const deleted = await UserController.remove(user[0].id);
        console.log(deleted);
        dispatch({
            "type": "signOut"
        })
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.title}>
                <Text style={styles.text}>Credenciais Google</Text>
            </View>
            <Image
                style={styles.image}
                source={url ? {uri: url,} : require('../../../assets/user.png')}
                resizeMode='contain'
            />
            <Text style={styles.textDados}>Nome: {nome}</Text>
            <Text style={styles.textDados}>E-mail: {email}</Text>

            <TouchableOpacity onPress={async () => await apagar()} style={styles.salvar}><Text style={styles.salvarText}>Apagar credenciais</Text></TouchableOpacity>
        </View>
    );
}