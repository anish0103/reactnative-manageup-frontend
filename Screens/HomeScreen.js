import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
// import Carousel from 'react-native-snap-carousel'

import TaskItemCard from "../Components/TaskItemCard";
import ProjectItemCard from "../Components/ProjectItemCard";

const HomeScreen = () => {
    const isCarousel = React.useRef(null)
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('window').width * 0.90

    // Fetch Todays Date
    let DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date();
    let DateString = DayNames[d.getDay()] + ", " + MonthNames[d.getMonth()] + " " + d.getDate()

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
    }]

    const ProjectData = [{
        id: Math.random(),
        Name: "Project 1"
    },{
        id: Math.random(),
        Name: "Project 2"
    },{
        id: Math.random(),
        Name: "Project 3"
    },{
        id: Math.random(),
        Name: "Project 4"
    },
]

    return (
        <View style={styles.container}>
            <ScrollView style={{width: '100%'}}>
                <View>
                    <Text style={styles.dateText}>{DateString}</Text>
                </View>
                <View style={styles.ProjectContainer}>
                    <Text style={[styles.headingText, { marginLeft: '5%' }]}>All Projects</Text>
                    {/* <Carousel
                            layout="default"
                            ref={isCarousel}
                            data={ProjectData}
                            renderItem={ProjectItemCard}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        /> */}
                    <ProjectItemCard item={{Name: "Project Name"}} />
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: '15%',
        paddingTop: 10
    },
    taskContainer: {
        width: '100%',
        height: Dimensions.get("window").height > 800 ? 370 : 280
    },
    headingText: {
        fontSize: Dimensions.get('window').scale < 2 ? 22 : 19,
        fontWeight: "500",
        marginVertical: 10
    },
    dateText: {
        fontSize: Dimensions.get('window').scale < 2 ? 24 : 20,
        color: "#646464",
        fontWeight: "500",
        textAlign: "center"
    },
    ProjectContainer: {
        width: '100%',
        marginVertical: 10,
    },
});

export default HomeScreen;