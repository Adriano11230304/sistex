import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../store/auth'
import { SimpleLineIcons } from '@expo/vector-icons';



export default function Header() {
    const { state, dispatch } = useAuth();
    function logout (){
        const action = {
            type: "signOut",
            user: null
        }
        dispatch(action);
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.buttonUser}>
                    <SimpleLineIcons name="user" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
                    <MaterialIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    );
}