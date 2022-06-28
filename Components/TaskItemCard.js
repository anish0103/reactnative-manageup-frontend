import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TaskItemCard = props => {
    
    const ClickHandler = () => {
        if(props.TaskClickHandler === undefined) {
            return
        }
        props.TaskClickHandler(props.data)
    }

    return (
        <TouchableOpacity onPress={ClickHandler} activeOpacity={0.6} style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.taskName}>{props.data.Name}</Text>
            </View>
            <View style={styles.statusContainer}>
                {props.data.Status === "Pending" ? <><AntDesign name="clockcircleo" size={18} color="#f89117" />
                    <Text style={styles.pendingText}>Pending</Text></> : <><MaterialIcons name="done" size={20} color="#5bd28c" />
                    <Text style={styles.completeText}>Completed</Text></>}
            </View>
        </TouchableOpacity>
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
        paddingHorizontal: 10,
        marginVertical: 8
    },
    taskName: {
        fontSize: Dimensions.get('window').scale < 2 ? 20 : 17,
        marginLeft: 5,
        fontWeight: "500",
    },
    pendingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 15,
        fontWeight: "500",
        marginLeft: 8,
        color: "#f89117"
    },
    completeText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 15,
        fontWeight: "500",
        color: "#5bd28c",
        marginLeft: 8,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center"
    },

})

export default TaskItemCard;