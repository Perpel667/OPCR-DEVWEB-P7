import axios from "axios";

// posts

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () =>{
    return(dispatch) =>{
        return axios
        .get(`http://localhost:5000/api/post`,{
            withCredentials: true
        })
        .then((res) =>{
            dispatch({type:"GET_POSTS", payload: res.data})
        })
        .catch((err) => console.log(err))
    }
}

export const deletePost = (postId) =>{
    return(dispatch) =>{
        return axios
        .delete(`http://localhost:5000/api/post/${postId}`,{
            withCredentials: true
        })
        .then((res) =>{
            dispatch({type:"DELETE_POST", payload: postId})
        })
        .catch((err) => console.log(err))
    }
}

