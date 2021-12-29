import axios from "axios";

// posts

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";


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
export const addComment = (postId,message) =>{
    return(dispatch) =>{
        return axios({
            method:"POST",
            url:`http://localhost:5000/api/comment/${postId}`,
            data:{message:message},
            withCredentials: true
        })
        .then((res) =>{
            dispatch({type:"ADD_COMMENT", payload: message})
        })
        .catch((err) => console.log(err))
    }
}