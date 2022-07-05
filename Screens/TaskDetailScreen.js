import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import Modal from "react-native-modal";
import Carousel from 'react-native-snap-carousel'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import TeamMemberCard from "../Components/TeamMemberCard";
import ModalHeader from "../Components/ModalHeader";

const TaskDetailScreen = props => {
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('window').width * 0.90

    const CurrentUser = props.data?.Members.filter(data => data._id === props.userid)

    const StatusHandler = () => {
        props.TaskStatusChanger(props.data);
    }

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} isVisible={props.isVisible} onRequestClose={() => props.TaskToggleHandler()}>
            <ModalHeader title={"Task Details"} />
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>{props?.data?.Name}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Description</Text>
                    <Text numberOfLines={8} style={styles.descriptionText}>{props?.data?.Description}</Text>
                </View>
                <View style={styles.TeamMemberContainer}>
                    <Text style={[styles.headingText, { marginLeft: '5%' }]}>Assigned To</Text>
                    <Carousel
                        layout="default"
                        data={props?.data?.Members}
                        renderItem={TeamMemberCard}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Duration</Text>
                    <View style={styles.durationContainer}>
                        <Text style={styles.durationText}>{props?.data?.StartDate}</Text>
                        <Text style={styles.durationTimeline}> </Text>
                        <Text style={styles.durationText}>{props?.data?.EndDate}</Text>
                    </View>
                </View>
                {CurrentUser !== undefined && CurrentUser[0].role === "Manager" && <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Member Status</Text>
                    <ScrollView style={{ height: 162 }}>
                        {props?.data?.Members.map(data => {
                            if (data._id !== props.userid) {
                                return (
                                    <View style={styles.memberStatusContainer}>
                                        <Text style={{ fontSize: Dimensions.get('window').scale < 2 ? 18 : 15, flex: 1 }}>{data.value}</Text>
                                        {data.Status === "Pending" ? <><AntDesign style={{paddingRight: 3}} name="clockcircleo" size={18} color="#f89117" /><Text style={styles.pendingText}>PENDING...</Text></> : <><MaterialIcons style={{paddingRight: 3}} name="done" size={20} color="#5bd28c" />
                                            <Text style={styles.completeText}>COMPLETED</Text></>}
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>
                </View>}
                {CurrentUser !== undefined && CurrentUser[0].role === "Member" && <View style={styles.detailContainer}>
                    <Text style={styles.headingText}>Your Status</Text>
                    {CurrentUser !== undefined && CurrentUser[0].Status === "Pending" ? <Text style={styles.pendingText}>PENDING...</Text> : <Text style={styles.completeText}>COMPLETED</Text>}
                </View>}
                {CurrentUser !== undefined && CurrentUser[0].role === "Member" && <View style={styles.buttonContainer}>
                    {CurrentUser !== undefined && CurrentUser[0].Status === "Pending" ? <TouchableOpacity onPress={StatusHandler} activeOpacity={0.6} style={styles.button}>
                        <Text style={styles.buttonText}>Completed</Text>
                    </TouchableOpacity> : <TouchableOpacity disabled activeOpacity={0.6} style={styles.button}>
                        <Text style={[styles.buttonText, { opacity: 0.5 }]}>Completed</Text>
                    </TouchableOpacity>}
                </View>}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%',
        alignItems: "center",
        backgroundColor: "white"
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
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 14,
        color: '#646464',
        textAlign: "justify"
    },
    pendingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 19 : 18,
        fontWeight: "500",
        color: "#f89117"
    },
    completeText: {
        fontSize: Dimensions.get('window').scale < 2 ? 19 : 18,
        fontWeight: "500",
        color: "#5bd28c"
    },
    TeamMemberContainer: {
        width: '100%',
        marginVertical: 10,
    },
    headingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 22 : 19,
        fontWeight: "500",
        marginVertical: 10
    },
    durationContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    durationTimeline: {
        height: 40,
        marginVertical: 6,
        width: 2,
        backgroundColor: '#f5f5f6',
    },
    durationText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 14,
        backgroundColor: '#f5f5f6',
        width: '100%',
        paddingVertical: 8,
        borderRadius: 7,
        textAlign: "center",
        // color: '#646464'
    },
    memberStatusContainer: {
        width: '100%',
        height: 65,
        backgroundColor: "#f5f5f6",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 8
    }
});

export default TaskDetailScreen;