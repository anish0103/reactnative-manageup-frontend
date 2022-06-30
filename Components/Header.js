import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const Header = (props) => {
    return (
        <>
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{props.title}</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('Profile')} style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={require('../assets/avatar.png')} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        paddingTop: 35,
        position: "relative",
        backgroundColor: "white",
    },
    headerTitle: {
        fontSize: Dimensions.get('window').scale < 2 ? 28 : 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    profileContainer: {
        position: "absolute",
        height: 35,
        width: 35,
        right: 15,
        bottom: 10,
        borderRadius: 200,
    },
    profileImage: {
        width: '100%',
        height: '100%'
    }
})

export default Header;