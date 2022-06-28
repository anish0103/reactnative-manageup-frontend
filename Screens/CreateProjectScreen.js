import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard, Dimensions, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import DatePicker from 'react-native-neat-date-picker';
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import Modal from "react-native-modal";

import ModalHeader from "../Components/ModalHeader";
import AlertComponent from "../Components/AlertComponent";

const CreateProjectScreen = props => {
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndtDate] = useState(undefined);
    const [selectedContact, setSelectedContact] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false)

    const AllUsers = useSelector(state => state.users.alluserdata);
    const userData = useSelector(state => state.users.userdata);
    let ModifiedUsers = [];

    if (AllUsers.length !== 0) {
        AllUsers.forEach(element => {
            ModifiedUsers.push({value: element.Name, _id: element._id, isChecked: false});
        });
    }

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = (date) => {
        setShowDatePicker(false);
        setEndtDate(date.endDateString);
        setStartDate(date.startDateString);
    }

    const buttonHandler = () => {
        const ProjectDetails = {
            Name: name,
            Description: description,
            StartDate: startDate,
            EndDate: endDate,
            Members: selectedContact
        }
        if (name === undefined || description === undefined || startDate === undefined || endDate === undefined || name.trim().length === 0 || description.trim().length === 0 || startDate.trim().length === 0 || endDate.trim().length === 0 || selectedContact.length === 0) {
            return AlertComponent("Warning", "Please enter some valid data!!");
        } else {
            ProjectDetails.Members.push({_id: userData._id, value: userData.Name});
            props.AddProjectDataHandler(ProjectDetails)
            setName(undefined)
            setEndtDate(undefined)
            setStartDate(undefined)
            setDescription(undefined)
            setSelectedContact([])
        }
    }

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} onRequestClose={() => props.ProjectToggleHandler()} isVisible={props.isVisible}>
            <ModalHeader title={"Create Project"} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.createProjectMainContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputName}>Project Name</Text>
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
                    <View>
                        {AllUsers.length === 0 ? <Text>No user is there</Text> : <RNMultiSelect
                            width={'100%'}
                            disableAbsolute={true}
                            data={ModifiedUsers}
                            placeholder="Search/Select your contact"
                            onSelect={(selectedItems) => setSelectedContact(selectedItems)}
                        />}
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
});

export default CreateProjectScreen;