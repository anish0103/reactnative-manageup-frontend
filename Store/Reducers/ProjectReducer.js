import { CREATEPROJECT, CREATETASK, GETALLTASK, GETPROJECTS, GETUSERPROJECT } from "../Actions/ProjectActions";

const initialState = {
    projectsdata: [],
    userprojects: [],
    taskdata: []
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETPROJECTS:
            return { ...state, projectsdata: action.data }
        case GETUSERPROJECT:
            const UserProjectData = state.projectsdata.filter((data) => {
                if (data.Members.filter(d => d._id === action.id).length !== 0) {
                    return true;
                } else {
                    return false;
                }
            })
            return { ...state, userprojects: UserProjectData }
        case GETALLTASK:
            const TaskData = []
            state.userprojects.map(data => data.Task.map(d => TaskData.push(d)));
            return { ...state, taskdata: TaskData };
        case CREATEPROJECT:
            state.userprojects.push(action.data)
            return {...state, userprojects: state.userprojects}
        case CREATETASK:
            state.taskdata.push(action.data)
            return {...state, taskdata: state.taskdata}
        default:
            return state;
    }
}

export default ProjectReducer;