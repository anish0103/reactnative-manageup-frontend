import { React, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Modal from "react-native-modal";

import AlertComponent from "../Components/AlertComponent";

const SignUpScreen = props => {

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [name, setName] = useState(undefined)

    const emailValid = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    const nameValid = "^[a-zA-Z.,?\\s]*$";

    const ButtonHandler = () => {
        const Data = { Name: name, Email: email, Password: password }
        if (name === undefined || email === undefined || password === undefined || name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || !email.match(emailValid) || !name.match(nameValid) || password.trim().length < 5) {
            return AlertComponent("Warning", "Please enter valid data!!")
        } else {
            // Perform the sign In Logic
            props.SignUpButtonHandler(Data);
            // setName(undefined)
            // setEmail(undefined)
            // setPassword(undefined)
        }
    }

    const keyboardHandler = () => {
        Keyboard.dismiss();
    }

    const ToggleHandler = () => {
        props.ToggleHandler();
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHandler}>
            <Modal backdropColor="white" style={{ margin: 0 }} onRequestClose={() => props.ToggleHandler()} isVisible={props.isVisible}>
                <View style={styles.container}>
                    <View style={styles.haveAccountTextContainer}>
                        <Text onPress={ToggleHandler} style={styles.haveAccountText}>Have Account?Log In</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../assets/signup.jpg')} />
                    </View>
                    <View style={styles.signUpTextContainer}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </View>
                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>YOUR NAME</Text>
                            <TextInput value={name} onChangeText={(data) => setName(data)} style={styles.inputText} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>YOUR EMAIL</Text>
                            <TextInput keyboardType="email-address" value={email} onChangeText={(data) => setEmail(data)} style={styles.inputText} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>YOUR PASSWORD</Text>
                            <TextInput secureTextEntry={true} value={password} onChangeText={(data) => setPassword(data)} style={styles.inputText} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.6} onPress={ButtonHandler} style={styles.signInButton}>
                            <Text style={styles.signInText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        backgroundColor: "white"
    },
    haveAccountTextContainer: {
        position: "absolute",
        top: '4%',
        width: '100%',
    },
    haveAccountText: {
        textAlign: "right",
        marginRight: "5%",
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 15 : 14,
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
    signUpTextContainer: {
        width: '80%',
    },
    signUpText: {
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
        fontSize: 16,
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

export default SignUpScreen;