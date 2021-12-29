import axios from "axios";

// posts

export const GET_COMMENTS = "GET_COMMENTS";


export const getComments = (postId) =>{
    return(dispatch) =>{
        return axios
        .get(`http://localhost:5000/api/comment/${postId}`,{
            withCredentials: true
        })
        .then((res) =>{
            dispatch({type:"GET_COMMENTS", payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}