import { GET_USER } from "../actions/user.actions";
/* import { GET_UID } from "../actions/user.actions"; */

const initialState = {};


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        /* case GET_UID:
            return action.payload */
        default:
            return state;
    }
}
