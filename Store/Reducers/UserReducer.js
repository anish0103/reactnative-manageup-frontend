import { CREATEUSER, GETUSERBYID, GETUSERS, LOGINUSER } from "../Actions/UserActions";

const initialState = {
    userdata: [],
    alluserdata: []
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETUSERS:
            return { ...state, alluserdata: action.data }
        case CREATEUSER:
            return { ...state, userdata: action.data }
        case LOGINUSER: 
            return {...state, userdata: action.data}
        case GETUSERBYID:
            return {...state, userdata: action.data}
        default:
            return state;
    }
}

export default UserReducer;