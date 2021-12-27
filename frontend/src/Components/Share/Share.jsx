import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from "axios";
import { GoFileMedia } from "react-icons/go";
import './share.scss'


export default function Share() {
    const userData = useSelector((state) => state.userReducer);

    const [message,setMessage] = useState("");
    const [picture,setPicture] = useState (null);

    // set post picture handle
    const HandlePostPicture = (e) =>{
        function setPictureAsync() {
          return new Promise(resolve => {
              setPicture(e.target.files[0])
              resolve(picture);
          });
        }
        
        async function getPictureAsync() {
           await setPictureAsync();
        }
        getPictureAsync();
    }

    // New Post Handle
    const handleNewPost = (e) =>{
        const data = new FormData();
        data.append("message", message);
        data.append("image_url", picture);
    
          axios({
              method: "POST",
              url: `http://localhost:5000/api/post/`,
              data: data,
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            })
            .then(response =>{
                console.log(response);
            })
            .catch(error =>{
                console.log(error);
            })
    }
    

    return (
        <div className="share">
            <form className="shareWrapper" onSubmit={handleNewPost}>
                <div className="shareTop">
                     <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="shareProfilePicture"/>
                    <input placeholder="Exprimez-vous" className="shareInput" onChange={(e) => setMessage(e.target.value)} value={message} />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                        <GoFileMedia className="shareIcon"/>
                            <input type="file" name="image" id="image" style={{display: "none"}} onChange={HandlePostPicture}/>
                            <label htmlFor="image" >
                                <span className="shareOptionText">Ajouter une photo</span>
                            </label> 
                        </div>
                    </div>
                    <button className="shareButton" type="submit" >Publier</button>
                </div>
            </form>
        </div>
    )
}
