export const GETUSERS = "GETUSERS";
export const SETUSERDETAIL = "SETUSERDETAIL";
export const CREATEUSER = "CREATEUSER";
export const LOGINUSER = "LOGINUSER";

const URL = "http://192.168.0.171:8080";

export const getAllUsers = () => {
    return async dispatch => {
        try {
            // Fetch the Users From Backend
            const response = await fetch(URL + "/api/users")
            const data = await response.json();
            dispatch({
                type: GETUSERS,
                data: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const createUser = data => {
    return async dispatch => {
        try {
            // Send the Data To the backend
            const response = await fetch(URL + '/api/users/signup/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const userdata = await response.json()
            if (!response.ok) {
                throw userdata.message
            }
            dispatch({
                type: CREATEUSER,
                data: userdata
            })
        } catch (error) {
            throw error
        }
    }
}

export const loginUser = data => {
    return async dispatch => {
        try {
            // Check the user and perform login 
            const response = await fetch(URL + '/api/users/login/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const userdata = await response.json()
            if (!response.ok) {
                throw userdata.message
            }
            dispatch({
                type: LOGINUSER,
                data: userdata
            })
        } catch (error) {
            throw error;
        }
    }
}