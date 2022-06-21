import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreateScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Create Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "88%",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default CreateScreen;