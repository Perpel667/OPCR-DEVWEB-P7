import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FaCircleNotch } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import DeletePostButton from './DeletePostButton'
import { getPosts, updatePost } from "../../actions/post.actions"

import './post.scss';
import moment from 'moment';
import 'moment/locale/fr';
import LikeButton from './LikeButton';
import CardComments from './CardComments';
moment.locale('fr');



export default function Post({post,userData}) {

    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(true);
    // options du post ( modification et suppression) //
    const [postOptions,setPostOptions] = useState(false);
    // modification du post //
    const [isUpdated,setIsUpdated] = useState(false);
    const [pictureUpdated,setPictureUpdated] = useState (null);
    const [textUpdate,setTextUpdate] = useState(null);
    // commentaires //
    const [showComments,setShowComments] = useState(false);

    // set post picture handle
    const HandlePictureUpdated = (e) =>{
        function setPictureAsync() {
            return new Promise(resolve => {
                setPictureUpdated(e.target.files[0])
                resolve(pictureUpdated);
            });
          }
          
          async function getPictureAsync() {
             await setPictureAsync();
          }
          getPictureAsync();
    }

    const updateItem = async () => {
        const data = new FormData();
        data.append("message", textUpdate);
        data.append("image_url", pictureUpdated);
        if(textUpdate){
            await dispatch(updatePost(post.id,data)).then(() => dispatch(getPosts()));
             setIsUpdated(false);
        }
    };

    

    // permet de fermer et ouvrir les menus sur le même bouton //
    function toggle() {
        setPostOptions(wasOpened => !wasOpened);
      }
    function cancelUpdate() {
        setIsUpdated(wasOpened => !wasOpened);
      }
    
    function closeOnUpdate(){
        setIsUpdated(true);
        setPostOptions(false);
    }

    const postLiked = useSelector((state) => state.likesReducer);



    useEffect(() =>{ post && setIsLoading(false)},[post])

    return (
        <div className="card-container" key={post.id}>
            {isLoading ? (
                <FaCircleNotch className="icon-spin"/>
            ): (
                <div className="postWrapper">
                    <div className="postTop">
                        {/* si le state postOption est sur true et que l'id de l'utilisateur est le même que celui qui a poster alors montre moi les options de l'article */}
                    {(postOptions && post.user_id === userData.id) &&  
                    <div className="postOptions">
                        <span className="postOptionsUpdate"><FaPencilAlt onClick={closeOnUpdate} /></span>
                        <span className="postOptionsDelete"><DeletePostButton post={post}/></span>
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
                            {/* si le state postOption est sur true et que l'id de l'utilisateur est le même que
                             celui qui a poster alors montre moi le bouton pour acceder aux options de l'article */}
                            {post.user_id === userData.id && <FiMoreVertical onClick={toggle}/>}
                    </div>
                    </div>
                    <div className="postCenter">
                        {!isUpdated && <span className="postText">{post?.message}</span> }
                        {isUpdated && 
                        <div className="update-post">
                            <textarea className="update-post-txt"
                            defaultValue={post.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                            />
                            <div className="update-post-bottom">
                            <input type="file" name="image_url" id="image_url" style={{display: "none"}} onChange={HandlePictureUpdated} />
                            <label id="imageLabel" htmlFor="image_url" >
                                <FcAddImage className="shareIcon"/>
                            </label> 
                                <div className="btn-container">
                                    <button className="update-post-btn"onClick={updateItem}>Valider la modification</button>
                                    <button className="update-post-btn cancel" onClick={cancelUpdate}>Annuler</button>
                                </div>
                            </div>
                        </div>
                        }
                    {post.image_url && <img src={`http://localhost:5000/api/images/posts/${post.image_url}`} alt="" className="postImg"/>}
                    
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                    <LikeButton post={post} userData={userData} postLiked={postLiked} />
                        <span className="postLikeCounter"></span>
                    </div>
                    <div className="postBottomright">
                        <span className="postCommentText" onClick={() => setShowComments(!showComments)}>{post.Commentaires} commentaires</span>
                    </div>
                </div>
                <hr className="commentHr"/>
                <div className="commentSection">
                    <div className="createComment">
                        <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="commentProfilePicture"/> 
                        <input className="commentInput" type="text" placeholder="Ecrivez un commentaire..."/>
                    </div>
                {showComments && <CardComments post={post}/>}
                </div>
                </div>
            )}
        </div>
    )
}
