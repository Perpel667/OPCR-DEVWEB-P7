import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Modal from 'react-modal';
import { FaCircleNotch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { FaTrashAlt,FaPencilAlt } from "react-icons/fa";
/* import axios from "axios"; */

import './post.scss';
import moment from 'moment';
import 'moment/locale/fr';
import LikeButton from './LikeButton';
moment.locale('fr');


  Modal.setAppElement('#root');

export default function Post({post,userData}) {


    const [isLoading,setIsLoading] = useState(true);
    const [postOptions,setPostOptions] = useState(false);

    function toggle() {
        setPostOptions(wasOpened => !wasOpened);
      }
    const postLiked = useSelector((state) => state.likesReducer);




    useEffect(() =>{ post && setIsLoading(false)

    },[post])
    return (
        <div className="card-container" key={post.id}>
            {isLoading ? (
                <FaCircleNotch className="icon-spin"/>
            ): (
                <div className="postWrapper">
                    <div className="postTop">
                    {(postOptions && post.user_id === userData.id) &&  
                    <div className="postOptions">
                        <span className="postOptionsUpdate"><FaPencilAlt /></span>
                        <span className="postOptionsDelete"><FaTrashAlt /></span>
                    </div>
                    }
                        <div className="postTopLeft">
                            <img src={`http://localhost:5000/api/${post.profilePicture}`} alt="" className="postProfilePicture"/>
                            <div className="postTopUserAndDate">
                               <span className="postUsername">{post.name} {post.firstname}</span> 
                               <span className="postDate">{moment(post.date).fromNow()}</span>
                            </div>
                            
                        </div>
                        <div className="postTopRight">
                            {post.user_id === userData.id && <FiMoreVertical onClick={toggle}/>}
                    </div>
                    </div>
                    <div className="postCenter">
                    <span className="postText">{post?.message}</span>
                    {post.image_url && <img src={`http://localhost:5000/api/images/posts/${post.image_url}`} alt="" className="postImg"/>}
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                    <LikeButton post={post} userData={userData} postLiked={postLiked} />
                        <span className="postLikeCounter"></span>
                    </div>
                    <div className="postBottomright">
                        <span className="postCommentText">{post.Commentaires} commentaires</span>
                    </div>
                </div>
                <hr className="commentHr"/>
                <div className="commentSection">
                <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="commentProfilePicture"/> <input className="commentInput" type="text" placeholder="Ecrivez un commentaire..."/>
                </div>
                </div>
            )}
        </div>
    )
}
