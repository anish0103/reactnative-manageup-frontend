import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";

const ChatMainScreen = () => {

    const Projects = [{
        Name: "Web Dev",
        id: 1,
    }, {
        Name: "React JS",
        id: 2,
    }, {
        Name: "Angular",
        id: 3,
    }, {
        Name: "Sql",
        id: 4,
    }, {
        Name: "React Native",
        id: 5,
    },{
        Name: "Web Dev",
        id: 6,
    }, {
        Name: "React JS",
        id: 7,
    }, {
        Name: "Angular",
        id: 8,
    }, {
        Name: "Sql",
        id: 9,
    }, {
        Name: "React Native",
        id: 51,
    },{
        Name: "Web Dev",
        id: 11,
    }, {
        Name: "React JS",
        id: 21,
    }, {
        Name: "Angular",
        id: 31,
    }, {
        Name: "Sql",
        id: 42,
    }, {
        Name: "React Native",
        id: 53,
    },]

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                {Projects.map((data) => (
                    <TouchableOpacity  key={data.id} style={styles.chatList}>
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