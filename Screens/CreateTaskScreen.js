import { React, useState } from "react";
import { View, Text, StyleSheet, Keyboard, Dimensions, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-neat-date-picker';
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

import ModalHeader from "../Components/ModalHeader";
import AlertComponent from "../Components/AlertComponent";

const CreateTaskScreen = props => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndtDate] = useState(undefined);
    const [selectedContact, setSelectedContact] = useState([]);
    const [selectedProject, setSelectedProject] = useState([]);

    const allUsers = useSelector(state => state.users.alluserdata);
    const userData = useSelector(state => state.users.userdata);
    const userProjects = useSelector(state => state.projects.userprojects)

    let ModifiedUsers = [];
    let ModifiedProjects = [];

    if (allUsers.length !== 0) {
        allUsers.forEach(element => {
            if (element._id !== userData._id) {
                ModifiedUsers.push({ value: element.Name, _id: element._id, isChecked: false, Status: "Pending", role: "Member" });
            }
        });
    }

    if (userProjects.length !== 0) {
        userProjects.forEach(element => {
            element.Members.map(data => {
                if (data._id === userData._id) {
                    if (data.role === "Manager") {
                        ModifiedProjects.push({ value: element.Name, _id: element._id, isChecked: false, Members: element.Members });
                    }
                }
            })
        });
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = (date) => {
        setShowDatePicker(false)
        setEndtDate(date.endDateString);
        setStartDate(date.startDateString);
    }

    const buttonHandler = () => {
        const TaskDetails = {
            Name: name,
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
            Members: selectedContact,
            Project: selectedProject
        }
        if (name === undefined || description === undefined || startDate === undefined || endDate === undefined || name.trim().length === 0 || description.trim().length === 0 || startDate.trim().length === 0 || endDate.trim().length === 0 || selectedContact.length === 0 || selectedProject.length === 0) {
            return AlertComponent("Warning", "Please enter some valid data!!");
        } else {
            TaskDetails.Members.push({ _id: userData._id, value: userData.Name, Status: "Pending", role: "Manager" });
            props.AddTaskDataHandler(TaskDetails)
            setName(undefined)
            setEndtDate(undefined)
            setStartDate(undefined)
            setDescription(undefined)
            setSelectedContact([])
            setSelectedProject([])
        }
    }

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} onRequestClose={() => props.TaskToggleHandler()} isVisible={props.isVisible}>
            <ModalHeader title={"Create Task"} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.createProjectMainContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputName}>Task Name</Text>
                        <TextInput multiline={true}
                            numberOfLines={1} value={name} onChangeText={(data) => setName(data)} style={styles.input} placeholder="Name" />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputName}>Add Description</Text>
                        <TextInput multiline={true}
                            numberOfLines={5} value={description} onChangeText={(data) => setDescription(data)} style={styles.input} placeholder="Description" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.6} onPress={openDatePicker} style={styles.button}>
                            <Text style={styles.buttonText}>Select the duration</Text>
                            <DatePicker
                                isVisible={showDatePicker}
                                mode={'range'}
                                onCancel={onCancel}
                                onConfirm={onConfirm}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.selectContainer}>
                        <View style={{ width: '50%', alignItems: "center" }}>
                            <Text style={styles.inputName}>Select Project</Text>
                            {userProjects.length === 0 || ModifiedProjects.length === 0
                                ? <View style={{ justifyContent: "center", height: 70 }}>
                                    <Text style={{ textAlign: "center", fontSize: Dimensions.get('window').scale < 2 ? 17 : 15, fontWeight: "500", color: "#646464" }}>No Projects is there</Text>
                                </View>
                                : <RNMultiSelect
                                    width={'88%'}
                                    disableAbsolute
                                    data={ModifiedProjects}
                                    placeholder="Project"
                                    onSelect={(selectedItems) => setSelectedProject(selectedItems)}
                                />}
                        </View>
                        <View style={{ width: '50%', alignItems: "center" }}>
                            <Text style={styles.inputName}>Select Members</Text>
                            {selectedProject.length === 0
                                ? <View style={{ justifyContent: "center", height: 70 }}>
                                    <Text style={{ textAlign: "center", fontSize: Dimensions.get('window').scale < 2 ? 17 : 15, fontWeight: "500", color: "#646464" }}>First select the project</Text>
                                </View>
                                : <RNMultiSelect
                                    width={'88%'}
                                    disableAbsolute
                                    data={ModifiedUsers}
                                    placeholder="People"
                                    onSelect={(selectedItems) => setSelectedContact(selectedItems)}
                                />}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={buttonHandler}>
                            <Text style={styles.buttonText}>Create Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    createProjectMainContainer: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        backgroundColor: "white"
    },
    inputContainer: {
        width: '90%',
        marginVertical: 5
    },
    inputName: {
        fontSize: Dimensions.get('window').scale < 2 ? 20 : 16,
        fontWeight: "500",
        marginBottom: 10
    },
    input: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
        padding: 10,
        fontSize: 16,
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
    selectContainer: {
        width: '90%',
        flexDirection: "row"
    },
    noText: {
        fontSize: Dimensions.get('window').scale < 2 ? 24 : 20,
        color: "#646464",
        fontWeight: "500",
        textAlign: "center"
    },
});

export default CreateTaskScreen;