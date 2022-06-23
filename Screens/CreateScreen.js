import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const CreateScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/createtaskproject.jpg')} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                    <Text style={styles.buttonText}>Create Project</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                    <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 65,
        width: '100%',
    },
    imageContainer: {
        height: '35%',
        width: '100%',
        marginBottom: 80
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        width: '100%',
        alignItems: "center"
    },
    button: {
        marginTop: 20,
        width: '90%',
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#246bfb'
    },
    buttonText: {
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 15,
        color: "white"
    },
});

export default CreateScreen;