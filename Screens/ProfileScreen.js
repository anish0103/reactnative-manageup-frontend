import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
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

export default ProfileScreen;