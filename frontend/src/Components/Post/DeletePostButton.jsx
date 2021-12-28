import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {deletePost} from "../../actions/post.actions"



export default function DeletePostButton({post}) {
    const dispatch = useDispatch();

const deleteQuote = () => dispatch(deletePost(post.id))

   
    return (
        <>
        <FaTrashAlt onClick={() =>{
            if(window.confirm("Voulez vous vraiment supprimer cet article ?")){
                deleteQuote();
            }
        }}/>
        </>      
    )
}
