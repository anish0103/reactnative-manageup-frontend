import { React, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import ChatScreen from "./ChatScreen";

const ChatMainScreen = () => {
    const [chatShow, setChatShow] = useState(false)
    const [chatData, setChatData] = useState(undefined)
    const userprojects = useSelector(state => state.projects.userprojects)

    const ToggleHandler = () => {
        setChatShow(!chatShow)
    }

    const ClickHandler = (data) => {
        ToggleHandler();
        setChatData(data)
    }

    if (chatShow) {
        return (
            <ChatScreen data={chatData} isVisible={chatShow} ToggleHandler={ToggleHandler} />
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                {userprojects.length === 0 ? <View style={styles.container}><Text style={{ fontSize: Dimensions.get('window').scale < 2 ? 24 : 20, color: "#646464", fontWeight: "500", textAlign: "center" }}>No chat is available</Text></View> : userprojects.map((data) => (
                    <TouchableOpacity onPress={() => ClickHandler(data)} key={data.id} style={styles.chatList}>
                        <View style={styles.imageContainer}>
                            <Text style={styles.chatProfileName}>{data.Name.charAt(0)}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.nameText}>{data.Name}</Text>
                            <Text numberOfLines={1} style={styles.lastText}>Xyz: Update this thing!</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: '18%',
        paddingTop: '5%'
    },
    chatList: {
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 15,
        alignItems: "center",
        marginVertical: 10
    },
    imageContainer: {
        width: 52,
        height: 52,
        borderRadius: 200,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#f5f5f6"
    },
    chatProfileName: {
        fontSize: Dimensions.get('window').scale < 2 ? 25 : 22,
        color: '#646464',
        fontWeight: "500"

    },
    nameText: {
        fontWeight: "500",
        fontSize: Dimensions.get('window').scale < 2 ? 24 : 21
    },
    lastText: {
        color: "#646464",
    },
});

export default ChatMainScreen;