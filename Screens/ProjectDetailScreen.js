import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
// import Carousel from 'react-native-snap-carousel'

import Header from "../Components/Header";
import TeamMemberCard from "../Components/TeamMemberCard";
import TaskItemCard from "../Components/TaskItemCard";

const ProjectDetailScreen = () => {
    const isCarousel = React.useRef(null)
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('window').width * 0.90

    const data = [
        {
            title: "Anish Patel",
        },
        {
            title: "Dhruv Patel",
        },
        {
            title: "Rony Parmar",
        },
        {
            title: "Satyam Raval",
        },
    ];

    const TaskData = [{
        Name: "Improve",
        id: Math.random(),
        Status: "pending"
    }, {
        Name: "Maintain",
        id: Math.random(),
        Status: "completed"
    }, {
        Name: "Fix the bug",
        id: Math.random(),
        Status: "pending"
    }, {
        Name: "Authentication",
        id: Math.random(),
        Status: "completed"
    },
    ]

    return (
        <>
            <Header title={"Project Details"} />
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.headingText}>Project Name</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.headingText}>Description</Text>
                        <Text numberOfLines={8} style={styles.descriptionText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. like.</Text>
                    </View>
                    <View style={styles.TeamMemberContainer}>
                        <Text style={[styles.headingText, { marginLeft: '5%' }]}>Team Members</Text>
                        {/* <Carousel
                            layout="default"
                            ref={isCarousel}
                            data={data}
                            renderItem={TeamMemberCard}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        /> */}
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <Text style={[styles.headingText, { marginLeft: '5%' }]}>All Task</Text>
                    <ScrollView style={{ height: '100%' }}>
                        <View style={{ width: '90%', marginLeft: '5%' }}>
                            {TaskData.map((data) => <TaskItemCard key={data.id} data={data} />)}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
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
    taskContainer: {
        width: '100%',
        height: 280
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
    TeamMemberContainer: {
        width: '100%',
        marginVertical: 10,
        height: '100%'
    },
    descriptionText: {
        fontSize: Dimensions.get('window').scale < 2 ? 17 : 14,
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

export default ProjectDetailScreen;