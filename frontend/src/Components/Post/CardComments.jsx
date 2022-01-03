import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment, getComments, deleteComment } from '../../actions/comments.actions';
import { getPosts } from "../../actions/post.actions"
import { getUsers } from '../../actions/users.actions';
import { FiMoreVertical } from "react-icons/fi";
import { FaTrashAlt,FaPencilAlt } from "react-icons/fa";


import moment from 'moment';
import 'moment/locale/fr';
import './cardComments.scss';


moment.locale('fr');


export default function CardComments({post}) {


    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const commentsData = useSelector((state) => state.commentsReducer);

    const [commentUpdated,setCommentUpdated] = useState(false);
    const [edit,setEdit] = useState(false);
    const [text,setText] = useState("");
    const [commentId,setCommentId] = useState("");
    
    

    useEffect(() => {
        dispatch(getComments(post.id));
        dispatch(getUsers())
       }, [dispatch,post]);

       const handleEditComment = (e) => {
           e.preventDefault();
           if(text){
               dispatch(editComment(post.id,commentId,text));
               setText('');
               setCommentUpdated(!commentUpdated);
           }
       }

       const handleDeleteComment = () => {dispatch(deleteComment(commentId)).then(()=> dispatch(getPosts()))};

       const storeCommentIdAndSetEdit = (commentId) => {
           setEdit(!edit);
           setCommentId(commentId)
       }
    return (
       <div className="comments-container">
           {/* on map les commentaires pour les sortir un par un  */}
           {(commentsData[0]) && commentsData.map((comment)=>{
               return(
                   <div className="comment-container-global" key={comment.id}>
                       <div className="comment-container-global-left">
                            <div className={comment.user_id === userData.id ? "comment-container client" : "comment-container"} >
                       <img src={usersData[0] && 
                       /* on map la data de tout les users pour avoir leurs infos et photos */
                        usersData.map((user)=>{
                            if(user.id === comment.user_id) return `http://localhost:5000/api/${user.image}`;
                            else return null;
                        }).join('')} 
                        alt="commenter pic" className="postProfilePicture"/>
                       
                       <div className="comment-container-center">
                       <div className="commenter-name">
                               {usersData[0] && 
                       /* on map la data de tout les users pour avoir leurs infos et photos */
                        usersData.map((user)=>{
                            if(user.id === comment.user_id) return <div className="pseudo" key={user.id}>{user.name} {user.firstname}</div>;
                            else return null;
                        })}
                               </div>
                               <p className="comment-text">{comment.message}</p>
                                {(commentUpdated && userData.admin === 1 || (comment.user_id === userData.id)) === true && 
                                <form action="" onSubmit={handleEditComment} className="edit-comment-form">
                                     <textarea className="edit-comment-input" type="text" name="comment" defaultValue={comment.message} onChange={(e)=> setText(e.target.value)} />
                                     <br />
                                     <input type="submit" value="Valider" className="edit-comment-btn" />
                                </form>
                                }
                       </div>
                   </div>
                   <div className="comment-option-toggle">
                   {((comment.user_id === userData.id) || userData.admin === 1 && edit === false) && <FiMoreVertical onClick={(e) => storeCommentIdAndSetEdit(comment.id)}/>}
                   {((comment.user_id === userData.id) || userData.admin === 1 && edit === true) && 
                   <div className="edit-comment-options">
                        <label className="edit-comment-label" htmlFor="text" onClick={()=> setEdit(!edit)}><FaPencilAlt onClick={(e) => setCommentUpdated(!commentUpdated)} /></label>
                        <br />
                        <label className="delete-comment-label" htmlFor="text" onClick={()=> setEdit(!edit)}>
                            <FaTrashAlt 
                        onClick={(e)=> {if(window.confirm("Voulez vous vraiment supprimer ce commentaire?"))
                        {
                            handleDeleteComment()
                        }
                        }}/></label>
                   </div>
                   }
                       </div>
                       </div>
                      
                   <p className="comment-date">{moment(comment.date).fromNow()}</p>
                   </div>
                   
               )
           })}
       </div>
    )
}
