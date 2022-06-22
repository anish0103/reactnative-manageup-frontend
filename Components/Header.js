import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{props.title}</Text>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={require('../assets/avatar.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        paddingTop: 35,
        position: "relative"
    },
    headerTitle: {
        fontSize: Dimensions.get('window').scale < 2 ? 30 : 27,
        fontWeight: "bold",
        textAlign: "center"
    },
    profileContainer: {
        position: "absolute",
        height: 35,
        width: 35,
        right: 15,
        bottom: 10
    },
    profileImage: {
        width: '100%',
        height: '100%'
    }
})

export default Header;