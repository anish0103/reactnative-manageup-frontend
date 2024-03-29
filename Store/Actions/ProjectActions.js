import { Data } from "../../Components/Constant";

export const GETPROJECTS = "GETPROJECTS";
export const GETUSERPROJECT = "GETUSERPROJECT";
export const GETALLTASK = "GETALLTASK";
export const CREATEPROJECT = "CREATEPROJECT";
export const CREATETASK = "CREATETASK";
export const UPDATETASKSTATUS = "UPDATETASKSTATUS";

export const getAllProjects = () => {
    return async dispatch => {
        try {
            // Fetch the Users From Backend
            const response = await fetch(Data.URL + "/api/projects")
            const data = await response.json();
            dispatch({
                type: GETPROJECTS,
                data: data
            })
        } catch (error) {
            throw error
        }
    }
}

export const getUserProject = (id) => {
    return {
        type: GETUSERPROJECT,
        id: id
    }
}

export const getAllTask = () => {
    return {
        type: GETALLTASK
    }
}

export const createProject = data => {
    return async dispatch => {
        try {
            // Send New Project Data To the backend
            const response = await fetch(Data.URL + '/api/projects/createproject/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const projectdata = await response.json()
            if (!response.ok) {
                throw projectdata.message
            }
            dispatch({
                type: CREATEPROJECT,
                data: projectdata
            })
        } catch (error) {
            throw error
        }
    }
}

export const createTask = (id, data) => {
    return async dispatch => {
        try {
            // Send New Task Data To the backend
            const response = await fetch(Data.URL + `/api/projects/createtask/${id}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const projectdata = await response.json()
            if (!response.ok) {
                throw projectdata.message
            }
            dispatch({
                type: CREATETASK,
                data: data
            })
        } catch (error) {
            throw error
        }
    }
}

export const updateTaskStatus = (projectid, userid, data) => {
    return async dispatch => {
        try {
            // Update task status in the backend
            const response = await fetch(Data.URL + `/api/projects/updatetaskstatus/${projectid}/${userid}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const projectdata = await response.json()
            console.log(projectdata);
            if (!response.ok) {
                throw projectdata.message
            }
            dispatch({
                type: UPDATETASKSTATUS,
                data: projectdata
            })
        } catch (error) {
            throw error
        }
    }
}