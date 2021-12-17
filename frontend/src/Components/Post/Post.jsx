import {useEffect, useState} from 'react';
import { FaCircleNotch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

import './post.scss';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

export default function Post({post}) {

    const [isLoading,setIsLoading] = useState(true);
     
    useEffect(() =>{ post && setIsLoading(false)

    },[post])
    return (
        <div className="card-container" key={post.id}>
            {isLoading ? (
                <FaCircleNotch className="icon-spin"/>
            ): (
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <img src={`http://localhost:5000/api/${post.profilePicture}`} alt="" className="postProfilePicture"/>
                            <div className="postTopUserAndDate">
                               <span className="postUsername">{post.name} {post.firstname}</span> 
                               <span className="postDate">{moment(post.date).fromNow()}</span>
                            </div>
                            
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
