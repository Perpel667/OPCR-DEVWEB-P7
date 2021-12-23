import { useState,useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";


export default function LikeButton({post,userData,postLiked}) {


    const [like,setLike] = useState(post.Likes);
    const [isLiked,setIsLiked] = useState(false);



   useEffect(() => {
    axios({
        method: "GET",
        url:`http://localhost:5000/api/post/${post.id}/checkLiked`,
        withCredentials: true,
    })
   .then(response =>{
        return response.data
   })
   .then(data =>{
       if(data.length){
           setIsLiked(true)
       }
   })
   .catch(error =>{
       console.log(error.response.data);
       return
   })
   },[post])

    
    


    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
        axios({
            method: "PATCH",
            url:`http://localhost:5000/api/post/${post.id}/likes`,
            withCredentials: true,
        })
       .then(response =>{
            return response.data
       })
       .catch(error =>{
           console.log(error.response.data);
           return
       })
    }

if(isLiked){
    return (
        <div className="like-container">
            <div className="heart ">
                <AiFillHeart className="likeIconLiked" onClick={likeHandler} />
            </div>
            <span className="likeCount">{like}</span> 
        </div>
    )
} else
    return (
        <div className="like-container">
            <div className="heart ">
                <AiOutlineHeart className="likeIcon" onClick={likeHandler} />
            </div>
            <span className="likeCount">{like}</span> 
        </div>
    )
}
