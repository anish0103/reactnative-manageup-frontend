import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from "react-native";

const ProjectItemCard = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "column", height: '100%', flex: 1, justifyContent: 'space-around' }}>
                <View>
                    <Text style={styles.projectName}>{item.Name}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={styles.detailButton}>
                    <Text style={{ fontSize: Dimensions.get('window').scale < 2 ? 17 : 15, }}>Details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profilePhotoContainer}>
                {/* <Text>{item.Name.charAt(0)}</Text> */}
                <Image style={{width: '100%', height: "100%", resizeMode: "center"}} source={require('../assets/ProjectProfile.jpg')}  />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        width: '90%',
        height: 160,
        backgroundColor: "#246bfb",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        marginLeft: '5%'
    },
    projectName: {
        fontSize: Dimensions.get('window').scale < 2 ? 23 : 20,
        fontWeight: "500",
        color: "white"
    },
    detailButton: {
        backgroundColor: "white",
        width: '40%',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10
    },
    profilePhotoContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#f5f5f6",
        marginRight: 15,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },

})

export default ProjectItemCard;