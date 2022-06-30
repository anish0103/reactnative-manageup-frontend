import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const ProfileScreen = props => {
    const userdata = useSelector(state => state.users.userdata)
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/avatar.png')} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{userdata?.Name}</Text>
                <Text style={styles.emailText}>{userdata?.EmailId}</Text>
            </View>
            {/* <View style={styles.ButtonContainer}>
                <TouchableOpacity activeOpacity={0.6}>
                    <Text style={styles.editText}>Edit Profile</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.extraMainContainer}>
                <View style={styles.extraContainer}>
                    <Text style={styles.extraHeadingText}>Extra</Text>
                    <TouchableOpacity activeOpacity={0.6} style={styles.extraTextContainer}>
                        <Text style={styles.extraText}>Help</Text>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.extraTextContainer}>
                        <Text style={styles.extraText}>Rate this app</Text>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={styles.extraTextContainer}>
                        <Text style={styles.extraText}>Privacy & Policy</Text>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={()=> props.storeData()}  activeOpacity={0.6}>
                    <Text style={styles.logOutText}>Log Out</Text>
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
        paddingBottom: '15%',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: '50%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        width: '100%',
        marginVertical: 15
    },
    nameText: {
        textAlign: "center",
        fontSize: Dimensions.get('window').scale < 2 ? 35 : 32,
        fontWeight: "500"
    },
    emailText: {
        textAlign: "center",
        fontSize: 15,
        color: "#646464",
    },
    ButtonContainer: {
        width: "100%",
        alignItems: "center"
    },
    editText: {
        fontSize: Dimensions.get('window').scale < 2 ? 20 : 16,
        fontWeight: "500",
        color: "#246bfb"
    },
    logOutText: {
        fontSize: Dimensions.get('window').scale < 2 ? 28 : 24,
        fontWeight: "500",
        color: "#f56d6d"
    },
    extraMainContainer: {
        alignItems: "center",
        width: '100%',
        marginVertical: Dimensions.get('window').scale < 2 ? 22 : 15
    },
    extraContainer: {
        width: '90%',
    },
    extraHeadingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 34 : 28,
        fontWeight: "500",
        marginBottom: Dimensions.get('window').scale < 2 ? 25 : 15
    },
    extraText: {
        fontSize: Dimensions.get('window').scale < 2 ? 21 : 18,
        fontWeight: "500",
        color: "#646464",
        flex: 1
    },
    extraTextContainer: {
        flexDirection: "row",
        paddingVertical: Dimensions.get('window').scale < 2 ? 10 : 8
    }
});

export default ProfileScreen;