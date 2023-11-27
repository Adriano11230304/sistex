import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../store/auth'
import { Ionicons } from '@expo/vector-icons';



export default function Header() {
    const { state, dispatch } = useAuth();
    function configuracoes (){
        console.log("configuracoes");
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
            </View>
        </View>
    );
}