import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

import Header from "../Components/Header";

const TaskDetailScreen = () => {

    const status = "pending";

    return (
        <>
            <Header title={"Task Details"} />
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Task Name</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Description</Text>
                    <Text numberOfLines={8} style={styles.descriptionText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Status</Text>
                    {status === "pending" ? <Text style={styles.pendingText}>PENDING...</Text> : <Text style={styles.completeText}>COMPLETED</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    {status === "pending" ? <TouchableOpacity activeOpacity={0.6} style={styles.button}>
                        <Text style={styles.buttonText}>Completed</Text>
                    </TouchableOpacity> : <TouchableOpacity disabled activeOpacity={0.6} style={styles.button}>
                        <Text style={[styles.buttonText, { opacity: 0.5 }]}>Completed</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%',
        alignItems: "center"
    },
    buttonContainer: {
        width: '100%',
        alignItems: "center"
    },
    button: {
        marginVertical: 15,
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
    headingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 22 : 19,
        fontWeight: "500",
        marginVertical: 10
    },
    detailContainer: {
        width: '90%'
    },
    descriptionText: {
        fontSize: Dimensions.get('window').scale < 2 ? 19 : 16,
        color: '#646464',
        textAlign: "justify"
    },
    pendingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 22 : 19,
        fontWeight: "500",
        marginVertical: 8,
        color: "#f89117"
    },
    completeText: {
        fontSize: Dimensions.get('window').scale < 2 ? 22 : 19,
        fontWeight: "500",
        marginVertical: 8,
        color: "#5bd28c"
    },
});

export default TaskDetailScreen;