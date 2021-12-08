import axios from "axios";

export const GET_USER = "GET_USER";
/* export const GET_UID = "GET_UID"; */

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
        .get(`http://localhost:5000/api/user/${uid}`)
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
};
/* export const getUserId = (userId) => {
    return (dispatch) => {
            dispatch({ type: GET_UID, payload: userId });
    };
}; */
