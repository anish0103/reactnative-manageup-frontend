import { React } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";


const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#246bfb" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        backgroundColor: 'white',
    },
});

export default LoadingScreen;