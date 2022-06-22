import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const AppStartScreen = () => {

    const ButtonHandler = () => {
        console.log("Button is Clicked!!");
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/appstartimage.jpg')} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.startText}>Work With{'\n'}Team{'\n'}Anytime</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={ButtonHandler} style={styles.signInButton}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "space-evenly"
    },
    imageContainer: {
        height: '35%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        width: '80%',
    },
    startText: {
        paddingHorizontal: '5%',
        fontWeight: "600",
        fontSize: Dimensions.get('window').scale < 2 ? 52 : 42
    },
    buttonContainer: {
        width: '100%',
        alignItems: "center"
    },
    signInButton: {
        marginTop: 20,
        width: '90%',
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#246bfb'
    },
    signInText: {
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 18 : 15,
        color: "white"
    },
});

export default AppStartScreen;