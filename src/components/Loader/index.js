import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={"#2a2a2a"} size={64} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height + 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 100
    },
});