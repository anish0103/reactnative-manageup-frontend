import { React, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import LoadingScreen from "./LoadingScreen";
import AlertComponent from "../Components/AlertComponent";
import { useDispatch } from "react-redux";

import CreateTaskScreen from "./CreateTaskScreen";
import CreateProjectScreen from "./CreateProjectScreen";
import { createProject, createTask } from "../Store/Actions/ProjectActions";

const CreateScreen = () => {
    const [taskShow, setTaskShow] = useState(false)
    const [projectShow, setProjectShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const TaskToggleHandler = () => {
        setTaskShow(!taskShow)
    }

    const ProjectToggleHandler = () => {
        setProjectShow(!projectShow)
    }

    const CreateProjectFunction = async data => {
        setLoading(true);
        try {
            await dispatch(createProject(data));
            setLoading(false)
            return AlertComponent("Message", "Project is created successfully")
        } catch (error) {
            setLoading(false)
            return AlertComponent("Error", error)
        }
    }

    const CreateTaskFunction = async data => {
        setLoading(true);
        try {
            await dispatch(createTask(data.Project[0]._id, data));
            setLoading(false)
            return AlertComponent("Message", "Project is created successfully")
        } catch (error) {
            setLoading(false)
            return AlertComponent("Error", error)
        }
    }

    const AddTaskDataHandler = data => {
        CreateTaskFunction(data);
        TaskToggleHandler()
    }

    const AddProjectDataHandler = data => {
        CreateProjectFunction(data);
        ProjectToggleHandler()
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <>
            <CreateTaskScreen AddTaskDataHandler={AddTaskDataHandler} TaskToggleHandler={TaskToggleHandler} isVisible={taskShow} />
            <CreateProjectScreen AddProjectDataHandler={AddProjectDataHandler} ProjectToggleHandler={ProjectToggleHandler} isVisible={projectShow} />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/createtaskproject.jpg')} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => ProjectToggleHandler()} activeOpacity={0.6} style={styles.button}>
                        <Text style={styles.buttonText}>Create Project</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => TaskToggleHandler()} activeOpacity={0.6} style={styles.button}>
                        <Text style={styles.buttonText}>Create Task</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 65,
        width: '100%',
    },
    imageContainer: {
        height: '35%',
        width: '100%',
        marginBottom: 80
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        width: '100%',
        alignItems: "center"
    },
    button: {
        marginTop: 20,
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
});

export default CreateScreen;