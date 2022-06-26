import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import Modal from "react-native-modal";

import ModalHeader from "../Components/ModalHeader";

const ChatScreen = props => {

    const ChatData = [{
        Name: "Satyam Raval",
        id: Math.random(),
        userid: "4",
        Message: "Hello all, What's the update?"
    }, {
        Name: "Dhruv Patel",
        id: Math.random(),
        userid: "2",
        Message: "I'm currently working on my layout and learning new things"
    }, {
        Name: "Anish Patel",
        id: Math.random(),
        userid: "1",
        Message: "I'm currently designing my screens."
    }, {
        Name: "Rony Patel",
        id: Math.random(),
        userid: "3",
        Message: "I'm currently learning the navigation and soon going to implement it"
    }, {
        Name: "Satyam Raval",
        id: Math.random(),
        userid: "4",
        Message: "Okayy!! Good 👍"
    },
]

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} onRequestClose={() => props.ToggleHandler()} isVisible={props.isVisible}>
            {/* <Text style={styles.headerTitle}>{props.data.Name}</Text> */}
            <ModalHeader title={props.data.Name} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ paddingTop: 5 }}>
                        {ChatData.map((data) => {
                            if (data.userid !== "1") {
                                return (
                                    <View key={data.id} style={styles.chatItemLeft}>
                                        <View style={styles.chatTextLeft}>
                                            <Text style={{ marginBottom: 3, color: "#646464" }}>{data.Name}</Text>
                                            <Text style={styles.leftText}>{data.Message}</Text>
                                        </View>
                                    </View>
                                )
                            } else {
                                return (
                                    <View key={data.id} style={styles.chatItemRight}>
                                        <View style={styles.chatTextRight}>
                                            <Text style={styles.rightText}>{data.Message}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputText} placeholder="Message..." />
                        <TouchableOpacity style={styles.sendButton}>
                            <Text style={styles.sendText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "white"
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 12,
        marginHorizontal: 10,
        alignItems: "center"
    },
    inputText: {
        paddingHorizontal: 7,
        paddingVertical: 10,
        flex: 1,
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 16,
    },
    sendButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginLeft: 10,
        borderRadius: 8,
        backgroundColor: "#246bfb",
        alignItems: "center"
    },
    sendText: {
        fontSize: Dimensions.get('window').scale < 2 ? 18 : 17,
        fontWeight: "500",
        color: "white"
    },
    chatItemLeft: {
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    chatItemRight: {
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    chatTextLeft: {
        paddingVertical: 15,
        paddingHorizontal: 14,
        backgroundColor: "#f5f5f6",
        maxWidth: "70%",
        borderRadius: 25,
        flexDirection: "column",
        marginVertical: 4,
    },
    chatTextRight: {
        paddingVertical: 15,
        paddingHorizontal: 14,
        backgroundColor: "#246bfb",
        maxWidth: "70%",
        borderRadius: 25,
        flexDirection: "column",
        marginVertical: 4,
    },
    leftText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 16,
    },
    rightText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 16,
        color: "white"
    },
    headerTitle: {
        fontSize: Dimensions.get('window').scale < 2 ? 26 : 23,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10
    },

});

export default ChatScreen;