export const GETPROJECTS = "GETPROJECTS";
export const GETUSERPROJECT = "GETUSERPROJECT";
export const GETALLTASK = "GETALLTASK";

const URL = "http://192.168.0.171:8080";

export const getAllProjects = () => {
    return async dispatch => {
        try {
            // Fetch the Users From Backend
            const response = await fetch(URL + "/api/projects")
            const data = await response.json();
            dispatch({
                type: GETPROJECTS,
                data: data
            })
        } catch (error) {
            console.log(error);
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