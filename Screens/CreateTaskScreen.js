import { React, useState } from "react";
import { View, Text, StyleSheet, Keyboard, Dimensions, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-neat-date-picker';
// import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import Modal from "react-native-modal";

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
            SelectedContact: selectedContact,
            SelectedProject: selectedProject
        }
        if (name === undefined || description === undefined || startDate === undefined || endDate === undefined || name.trim().length === 0 || description.trim().length === 0 || startDate.trim().length === 0 || endDate.trim().length === 0 || selectedContact.length === 0 || selectedProject.length === 0) {
            return AlertComponent("Warning", "Please enter some valid data!!");
        } else {
            props.AddTaskDataHandler(TaskDetails)
            setName(undefined)
            setEndtDate(undefined)
            setStartDate(undefined)
            setDescription(undefined)
            setSelectedContact([])
            setSelectedProject([])
        }
    }

    const staticData = [
        {
            id: 0,
            value: "Anish Patel",
            isChecked: false,
        },
        {
            id: 1,
            value: "Dhruv Patel",
            isChecked: false,
        },
        {
            id: 2,
            value: "Rony Parmar",
            isChecked: false,
        },
        {
            id: 3,
            value: "Satyam Raval Sir",
            isChecked: false,
        },
    ];
    const staticData2 = [
        {
            id: 0,
            value: "Web Development",
            isChecked: false,
        },
        {
            id: 1,
            value: ".net",
            isChecked: false,
        },
        {
            id: 2,
            value: "html/css",
            isChecked: false,
        },
        {
            id: 3,
            value: "React JS",
            isChecked: false,
        },
    ];

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
                            {/* <RNMultiSelect
                                width={'88%'}
                                disableAbsolute
                                data={staticData2}
                                placeholder="Project"
                                onSelect={(selectedItems) => setSelectedProject(selectedItems)}
                            /> */}
                        </View>
                        <View style={{ width: '50%', alignItems: "center" }}>
                            <Text style={styles.inputName}>Select Members</Text>
                            <View style={{ justifyContent: "center", height: 70 }}>
                                <Text style={{ textAlign: "center", fontSize: Dimensions.get('window').scale < 2 ? 17 : 15, fontWeight: "500", color: "#646464" }}>First select the project</Text>
                            </View>
                            {/* <RNMultiSelect
                                width={'88%'}
                                disableAbsolute
                                data={staticData}
                                placeholder="People"
                                onSelect={(selectedItems) => setSelectedContact(selectedItems)}
                            /> */}
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

    }
});

export default CreateTaskScreen;