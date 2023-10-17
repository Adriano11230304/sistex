import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

export default function LoaderSimple() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={"#2a2a2a"} size={64} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
});