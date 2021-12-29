import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comments.actions';
import { getUsers } from '../../actions/users.actions';
import { FiMoreVertical } from "react-icons/fi";

import moment from 'moment';
import 'moment/locale/fr';
import './cardComments.scss';

moment.locale('fr');


export default function CardComments({post}) {


    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const commentsData = useSelector((state) => state.commentsReducer);

    useEffect(() => {
        dispatch(getComments(post.id));
        dispatch(getUsers())
       }, [dispatch,post]);

       

    return (
       <div className="comments-container">
           {/* on map les commentaires pour les sortir un par un  */}
           {(commentsData[0]) && commentsData.map((comment)=>{
               return(
                   <div className="comment-container-global">
                       <div className="comment-container-global-left">
                            <div className={comment.user_id === userData.id ? "comment-container client" : "comment-container"} key={comment.id}>
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
                            if(user.id === comment.user_id) return <div className="pseudo">{user.name} {user.firstname}</div>;
                            else return null;
                        })}
                               </div>
                           <p className="comment-text">{comment.message}</p>
                       </div>
                   </div>
                   <div className="comment-option-toggle"><FiMoreVertical /></div>
                   
                       </div>
                      
                   <p className="comment-date">{moment(comment.date).fromNow()}</p>
                   </div>
                   
               )
           })}
       </div>
    )
}
