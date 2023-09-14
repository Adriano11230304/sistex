import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { styles } from './style'



export default function Header({name}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.buttonUser}>
                    <Feather name="user" size={25} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}