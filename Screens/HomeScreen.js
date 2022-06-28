import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel'
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItemCard from "../Components/TaskItemCard";
import ProjectItemCard from "../Components/ProjectItemCard";
import ProjectDetailScreen from "./ProjectDetailScreen";
import TaskDetailScreen from "./TaskDetailScreen";
import LoadingScreen from "./LoadingScreen";
import AlertComponent from "../Components/AlertComponent";
import { getUserById, getAllUsers } from "../Store/Actions/UserActions";
import { getAllProjects, getUserProject, getAllTask } from "../Store/Actions/ProjectActions";

const HomeScreen = () => {
    const [projectDetailState, setProjectDetailState] = useState(false)
    const [taskDetailState, setTaskDetailState] = useState(false)
    const [projectData, setProjectData] = useState(undefined)
    const [taskData, setTaskData] = useState(undefined)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const userdata = useSelector(state => state.users.userdata)
    const userprojects = useSelector(state => state.projects.userprojects)
    const alltask = useSelector(state => state.projects.taskdata)

    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('window').width * 0.90
    let value;

    let DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let d = new Date();
    let DateString = DayNames[d.getDay()] + ", " + MonthNames[d.getMonth()] + " " + d.getDate()

    const DetailsFetchHandler = async () => {
        try {
            await dispatch(getAllProjects());
            await dispatch(getAllUsers());
            await dispatch(getUserById(value));
            await dispatch(getUserProject(value));
            await dispatch(getAllTask());
            setLoading(false);
        } catch (error) {
            setLoading(false);
            return AlertComponent("Error", error)
        }
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('userid', userdata._id)
            value = userdata._id;
        } catch (e) {
            console.log(e)
        }
    }

    const getStoredData = async () => {
        try {
            value = await AsyncStorage.getItem('userid')
            DetailsFetchHandler();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (userdata.length !== 0) {
            setLoading(true)
            storeData();
            DetailsFetchHandler();
        } else {
            setLoading(true)
            getStoredData();
        }
    }, [])

    const ProjectToggleHandler = () => {
        setProjectDetailState(!projectDetailState)
    }

    const TaskToggleHandler = () => {
        setTaskDetailState(!taskDetailState)
    }

    const ProjectClickHandler = data => {
        setProjectData(data)
        ProjectToggleHandler();
    }

    const TaskClickHandler = data => {
        setTaskData(data);
        TaskToggleHandler();
    }

    const ProjectItem = data => {
        return <ProjectItemCard ProjectClickHandler={ProjectClickHandler} data={data} />
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <>
            <ProjectDetailScreen ProjectToggleHandler={ProjectToggleHandler} data={projectData} isVisible={projectDetailState} />
            <TaskDetailScreen TaskToggleHandler={TaskToggleHandler} data={taskData} isVisible={taskDetailState} />
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <View>
                        <Text style={styles.dateText}>{DateString}</Text>
                    </View>
                    <View style={styles.ProjectContainer}>
                        <Text style={[styles.headingText, { marginLeft: '5%' }]}>All Projects</Text>
                        {userprojects.length === 0 ? <Text style={[styles.dateText]}>No Projects For You</Text> : <Carousel
                            layout="default"
                            data={userprojects}
                            renderItem={ProjectItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />}
                    </View>
                    <View style={styles.taskContainer}>
                        <Text style={[styles.headingText, { marginLeft: '5%' }]}>All Task</Text>
                        <ScrollView style={{ height: '100%' }}>
                            <View style={{ width: '90%', marginLeft: '5%' }}>
                                {alltask.length === 0 ? <Text style={[styles.dateText]}>No Task For You</Text> : alltask.map((data) => <TaskItemCard TaskClickHandler={TaskClickHandler} key={data.id} data={data} />)}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </>
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