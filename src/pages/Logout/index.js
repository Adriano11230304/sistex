import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../store/auth'

const Logout = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text>Loading...</Text>
        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Logout;