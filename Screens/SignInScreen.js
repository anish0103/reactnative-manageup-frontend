import {React, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";

const SignInScreen = () => {

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const ButtonHandler = () => {
        const FormData = {Email: email, Password: password}
        console.log(FormData);
        setName(undefined)
        setEmail(undefined)
    }

    const keyboardHandler = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHandler}>
            <View style={styles.container}>
                <View style={styles.createAccountTextContainer}>
                    <Text style={styles.createAccountText}>Create a Account</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/signin.jpg')} />
                </View>
                <View style={styles.loginTextContainer}>
                    <Text style={styles.loginText}>Log In</Text>
                </View>
                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLable}>YOUR EMAIL</Text>
                        <TextInput keyboardType="email-address" value={email} onChangeText={(data)=> setEmail(data)} style={styles.inputText} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLable}>YOUR PASSWORD</Text>
                        <TextInput secureTextEntry={true} value={password} onChangeText={(data)=> setPassword(data)} style={styles.inputText} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.6} onPress={ButtonHandler} style={styles.signInButton}>
                        <Text style={styles.signInText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "center"
    },
    createAccountTextContainer: {
        position: "absolute",
        top: '5%',
        width: '100%',
    },
    createAccountText: {
        textAlign: "right",
        marginRight: "5%",
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 16 : 15,
        textDecorationLine: "underline",
        zIndex: 100
    },
    imageContainer: {
        height: '33%',
        width: '100%',
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "contain",
        zIndex: 50
    },
    loginTextContainer: {
        width: '80%',
    },
    loginText: {
        paddingHorizontal: '7.5%',
        fontWeight: "600",
        marginBottom: '4%',
        fontSize: Dimensions.get('window').scale < 2 ? 42 : 32
    },
    inputContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    inputLable: {
        fontSize: 15,
        width: '87%',
        color: '#646464',
        fontWeight: '400'
    },
    inputText: {
        borderBottomColor: "#646464",
        borderBottomWidth: 1,
        borderColor: "#646464",
        width: '87%',
        fontSize: 18,
        paddingVertical: 10,
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

export default SignInScreen;