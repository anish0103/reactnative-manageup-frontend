import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";

import SignUpScreen from "./SignUpScreen";
import AlertComponent from "../Components/AlertComponent";
import { createUser, loginUser } from "../Store/Actions/UserActions";

const SignInScreen = props => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [signUpMode, setSignUpMode] = useState(false);

    const emailValid = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

    const translation = new Animated.Value(100);
    const opacity = new Animated.Value(0);

    const dispatch = useDispatch();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 800
            }),
            Animated.timing(translation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 800
            })
        ]).start();
    }, [])

    const MoveHandler = () => {
        props.storeData("Home");
    }

    const SignUpFunction = async data => {
        try {

            await dispatch(createUser(data));
            MoveHandler()
        } catch (error) {
            return AlertComponent("Error", error)
        }
    }

    const SignInFunction = async data => {
        try {
            await dispatch(loginUser(data));
            MoveHandler()
            setPassword(undefined)
            setEmail(undefined)
        } catch (error) {
            return AlertComponent("Error", error)
        }
    }

    const SignInButtonHandler = () => {
        if (email === undefined || password === undefined || email.trim().length === 0 || password.trim().length === 0 || !email.match(emailValid) || password.trim().length < 5) {
            return AlertComponent("Warning", "Please enter valid data!!");
        } else {
            const Data = { Email: email.toLowerCase(), Password: password }
            Keyboard.dismiss();
            SignInFunction(Data);
        }
    }

    const SignUpButtonHandler = (data) => {
        SignUpFunction(data)
    }

    const keyboardHandler = () => {
        Keyboard.dismiss();
    }

    const ToggleHandler = () => {
        setSignUpMode(!signUpMode)
    }

    return (
        <>
            <SignUpScreen SignUpButtonHandler={SignUpButtonHandler} ToggleHandler={ToggleHandler} isVisible={signUpMode} />
            <TouchableWithoutFeedback onPress={keyboardHandler}>
                <Animated.View style={[styles.container, { transform: [{ translateY: translation }], opacity: opacity }]}>
                    <View style={styles.createAccountTextContainer}>
                        <Text onPress={ToggleHandler} style={styles.createAccountText}>Create a Account</Text>
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
                            <TextInput keyboardType="email-address" value={email} onChangeText={(data) => setEmail(data)} style={styles.inputText} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLable}>YOUR PASSWORD</Text>
                            <TextInput secureTextEntry={true} value={password} onChangeText={(data) => setPassword(data)} style={styles.inputText} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.6} onPress={SignInButtonHandler} style={styles.signInButton}>
                            <Text style={styles.signInText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </>
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
        top: '6%',
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