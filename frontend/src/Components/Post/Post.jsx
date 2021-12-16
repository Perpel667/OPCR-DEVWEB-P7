import {useEffect, useState} from 'react';
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";

import './post.scss';

export default function Post({post}) {

    const [isLoading,setIsLoading] = useState(true);
     
    useEffect(() =>{ post && setIsLoading(false)

    },[post])
    return (
        <div className="card-container" key={post.id}>
            {isLoading ? (
                <FaCircleNotch class="icon-spin"/>
            ): (
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <img src={`http://localhost:5000/api/${post.profilePicture}`} alt="" className="postProfilePicture"/>
                            <span className="postUsername">{post.name} {post.firstname}</span>
                            <span className="postDate">{post.date}</span>
                        </div>
                        <div className="postTopRight">
                        <FiMoreVertical />
                    </div>
                    </div>
                    <div className="postCenter">
                    <span className="postText">{post?.message}</span>
                    <img src={`http://localhost:5000/api/images/posts/${post.image_url}`} alt="" className="postImg"/>
                </div>
                    
                </div>
            )}
        </div>
    )
}
