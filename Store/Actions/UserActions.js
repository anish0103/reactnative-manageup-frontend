import { Data } from "../../Components/Constant";

export const GETUSERS = "GETUSERS";
export const SETUSERDETAIL = "SETUSERDETAIL";
export const CREATEUSER = "CREATEUSER";
export const LOGINUSER = "LOGINUSER";
export const GETUSERBYID = "GETUSERBYID";

export const getAllUsers = () => {
    return async dispatch => {
        try {
            // Fetch the Users From Backend
            const response = await fetch(Data.URL + "/api/users")
            const data = await response.json();
            dispatch({
                type: GETUSERS,
                data: data
            })
        } catch (error) {
            throw "Something went wrong!! Please check your internet connection or try again later."
        }
    }
}

export const createUser = data => {
    return async dispatch => {
        try {
            // Send the Data To the backend
            const response = await fetch(Data.URL + '/api/users/signup/', {
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
            throw "Something went wrong!! Please check your internet connection or try again later."
        }
    }
}

export const loginUser = data => {
    return async dispatch => {
        try {
            // Check the user and perform login 
            const response = await fetch(Data.URL + '/api/users/login/', {
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
            throw "Something went wrong!! Please check your internet connection or try again later."
        }
    }
}

export const getUserById = id => {
    return async dispatch => {
        try {
            // Get the data of the user by passing the id of the user
            const response = await fetch(Data.URL + `/api/users/${id}`)
            const userdata = await response.json();
            if (!response.ok) {
                throw userdata.message
            }
            dispatch({
                type: GETUSERBYID,
                data: userdata
            })
        } catch (error) {
            throw "Something went wrong!! Please check your internet connection or try again later."
        }
    }
}