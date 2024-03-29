import { React, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from "react-native";


const IntroScreen = props => {
    const translation = new Animated.Value(100);
    const opacity = new Animated.Value(0);

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

    const RevertAnimation = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                useNativeDriver: true,
                duration: 800
            }),
            Animated.timing(translation, {
                toValue: -100,
                useNativeDriver: true,
                duration: 800
            })
        ]).start();
    }

    const MoveHandler = () => {
        props.storeData("Start");
    }

    const ButtonHandler = () => {
        RevertAnimation();
        setTimeout(MoveHandler, 800);
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: translation }], opacity: opacity }]}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/introimage.jpg')} />
            </View>
            <Text style={styles.appName}>ManageUp</Text>
            <View style={styles.textContainer}>
                <Text style={styles.introText}>Let's Create{'\n'}a Space{'\n'}For Your{'\n'}Workflows.</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={ButtonHandler} style={styles.startButton}>
                <Text style={styles.startText}>Get Start</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        backgroundColor: '#fcfcfc',
    },
    imageContainer: {
        height: '35%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    appName: {
        paddingHorizontal: 13,
        paddingVertical: 20,
        fontWeight: "600",
        fontSize: Dimensions.get('window').scale < 2 ? 18 : 15,
        color: '#246bfb'
    },
    textContainer: {
        width: '80%'
    },
    introText: {
        paddingHorizontal: 13,
        fontWeight: "600",
        fontSize: Dimensions.get('window').scale < 2 ? 52 : 42
    },
    startButton: {
        marginLeft: 13,
        marginTop: 20,
        width: 150,
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#246bfb'
    },
    startText: {
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 18 : 15,
        color: "white"
    },
});

export default IntroScreen;