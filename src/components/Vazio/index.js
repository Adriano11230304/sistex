import { styles } from './styles'
import { Text } from 'react-native';

export default function Vazio({text}) {
    return (
        <Text style={styles.vazio}>{text}</Text>
    )
}