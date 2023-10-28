import { View, ActivityIndicator } from 'react-native'
import { styles } from './style';


export default renderFooter = ({loading}) => {
    if (!loading) return null;
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={'#2a2a2a'} size={35} />
        </View>
    );
};