import { React, useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import io from 'socket.io-client'

import ModalHeader from "../Components/ModalHeader";
import { Data } from '../Components/Constant'
import AlertComponent from '../Components/AlertComponent';

let socket;
const backend = Data.URL;

const ChatScreen = props => {
    const scrollViewRef = useRef();
    const [chatData, setChatData] = useState([])
    const [messageText, setMessageText] = useState("")

    useEffect(() => {
        socket = io(backend)
    }, [])

    const GetMessages = useCallback(
        async () => {
            fetch(backend + `/api/projects/getmessages/${props.data._id}`).then((response) => response.json()).then((data) => {
                setChatData(data);
            })
        }, [])

    const SendMessage = async (data) => {
        const response = await fetch(backend + `/api/projects/sendmessage/${props.data._id}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const messagedata = await response.json()
        setMessageText("")
        setChatData(messagedata);
        socket.emit('sendmessage', { data: data, roomid: props.data._id })
    }

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                socket.emit('join', props.data._id)
            });
            socket.on('resmessage', (data) => {
                GetMessages()
            })
        }
    }, [])

    useEffect(() => {
        setChatData(props.data.Chat)
    }, [])

    const SendMessageHandler = () => {
        if(messageText.trim().length !==0) {
            const Message = { value: props.userdata.Name, id: Math.random(), userid: props.userdata._id, Message: messageText }
            SendMessage(Message)
        } else {
            return AlertComponent("Error", "Please enter some text in message box.")
        } 
    }

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} onRequestClose={() => props.ToggleHandler()} isVisible={props.isVisible}>
            <ModalHeader title={props.data.Name} />
            <View style={styles.container}>
                <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {chatData.length === 0
                        ? <View>
                            <Text style={styles.dateText}>No chats to show.</Text>
                        </View>
                        : chatData.map((data) => {
                            if (data.userid !== props.userdata._id) {
                                return (
                                    <View key={data.id} style={styles.chatItemLeft}>
                                        <View style={styles.chatTextLeft}>
                                            <Text style={{ marginBottom: 3, color: "#646464" }}>{data.value}</Text>
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
                    <TextInput autoFocus value={messageText} onChangeText={(data) => setMessageText(data)} style={styles.inputText} placeholder="Message..." />
                    <TouchableOpacity onPress={SendMessageHandler} style={styles.sendButton}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginVertical: 12,
        marginHorizontal: 10,
        alignItems: "center",
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
    dateText: {
        fontSize: Dimensions.get('window').scale < 2 ? 24 : 20,
        color: "#646464",
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10
    },

});

export default ChatScreen;