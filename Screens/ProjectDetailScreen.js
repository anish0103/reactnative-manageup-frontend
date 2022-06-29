import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Carousel from 'react-native-snap-carousel'
import Modal from "react-native-modal";

import ModalHeader from "../Components/ModalHeader";
import TeamMemberCard from "../Components/TeamMemberCard";
import TaskItemCard from "../Components/TaskItemCard";

const ProjectDetailScreen = props => {
    const isCarousel = React.useRef(null)
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Dimensions.get('window').width * 0.90

    return (
        <Modal backdropOpacity={1} animationIn="slideInRight" animationOut="slideOutRight" backdropColor="white" style={{ margin: 0 }} isVisible={props.isVisible} onRequestClose={() => props.ProjectToggleHandler()} >
            <ModalHeader title={"Project Details"} />
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.headingText}>{props?.data?.Name}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.headingText}>Description</Text>
                        <Text numberOfLines={8} style={styles.descriptionText}>{props?.data?.Description}</Text>
                    </View>
                    <View style={styles.TeamMemberContainer}>
                        <Text style={[styles.headingText, { marginLeft: '5%' }]}>Team Members</Text>
                        <Carousel
                            layout="default"
                            ref={isCarousel}
                            data={props?.data?.Members}
                            renderItem={TeamMemberCard}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideShift={0}
                            useScrollView={true}
                        />
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <Text style={[styles.headingText, { marginLeft: '5%' }]}>All Task</Text>
                    <ScrollView style={{ height: '100%' }}>
                        <View style={{ width: '90%', marginLeft: '5%' }}>
                            {props?.data?.Task?.length === 0 ? <Text style={{ fontSize: Dimensions.get('window').scale < 2 ? 20 : 17, textAlign: "center", color: '#646464',}}>No task is there, Please add some</Text> : props?.data?.Task?.map((data) => <TaskItemCard userid={props.userid} key={data.id} data={data} />)}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
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
    taskContainer: {
        width: '100%',
        height: Dimensions.get("window").height > 800 ? 370 : 280
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