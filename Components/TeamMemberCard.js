import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

const TeamMemberCard = ({item}) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={require('../assets/avatar.png')} />
            </View>
            <View>
                <Text style={styles.memberName}>{item.value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 65, 
        backgroundColor: "#f5f5f6",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        paddingHorizontal: 10
    },
    profileContainer: {
        height: 45,
        width: 45,
        backgroundColor: "grey",
        borderRadius: 100,
    },
    profileImage: {
        width: '100%',
        height: '100%'
    },
    memberName: {
        fontSize: Dimensions.get('window').scale < 2 ? 19 : 16,
        marginLeft: 12
    },
})

export default TeamMemberCard;