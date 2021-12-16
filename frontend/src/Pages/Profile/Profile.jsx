import Navbar from '../../Components/navbar/Navbar';
import { useState } from "react";
import {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import axios from "axios";
import './profile.scss';
import { AiFillCamera } from "react-icons/ai";
import profileBackground from '../../assets/images/profile-background2.jpeg';


export default function Profile() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      // password states
      const [password,setPassword] = useState ("");
      // delete account states
      const [DeleteConfirm, setDeleteConfirm] = useState(false);
      const toggleChecked = () => setDeleteConfirm(value => !value);
      // modify picture states
      const [picture, setPicture] = useState(null);

      // get userData from redux store
    const userData = useSelector((state) => state.userReducer)


    // modify password handle
    const handleModify = (e) =>{

        const succesMessage = document.querySelector('.password.succes');
        axios({
            method: "PUT",
            url:`http://localhost:5000/api/user/${userData.id}`,
            withCredentials: true,
            data:{
                email: userData.email,
                firstname: userData.firstname,
                name: userData.name,
                password
            },
        })
       .then(response =>{
           return response.data
       })
       .then(data =>{
           console.log(data);
           succesMessage.innerHTML = "Votre mot de passe a bien été modifié !"
       })
       .catch(error =>{
           console.log(error.response.data);
           return
       })
    }

    // delete account handle
    const handleDelete = (e) =>{

      axios({
          method: "DELETE",
          url:`http://localhost:5000/api/user/${userData.id}`,
          withCredentials: true,
      })
     .then(response =>{
         return response.data
     })
     .then(data =>{
         console.log(data);
         window.location = '/register';
     })
     .catch(error =>{
         console.log(error.response.data);
         return
     })
  }
 
    // modifiy profile picture handle
    const HandleUpdateProfilePicture = (e) =>{
      function setPictureAsync() {
        return new Promise(resolve => {
            setPicture(e.target.files[0])
            resolve(picture);
        });
      }
      
      async function getPictureAsync() {
        const result = await setPictureAsync();
      }
      getPictureAsync();
         
  }
  // send the updated profile pic to server //
  useEffect(() => {
    if(picture === null){
      return
    }
    const image = new FormData();
    image.append("image", picture);

      axios({
          method: "PUT",
          url: `http://localhost:5000/api/user/picture/${userData.id}`,
          data: image,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(response =>{
            console.log(response);
        })
        .catch(error =>{
            console.log(error);
        })
  },[picture]);


    return (
        <div>
            <Navbar />

            <div className="profile">
          <div className="profileTop">
            <div className="profileTitle">
                <img className="profileCoverImg" src={profileBackground} alt="" />
                <div className="profilePictureContainer">
                    <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="profileUserImg" />
                        <div className="modifyUserImg">
                            <input type="file" name="image" id="image" style={{display: "none"}} onChange={HandleUpdateProfilePicture}/>
                            <label htmlFor="image" >
                                <span className='editImage'><AiFillCamera /></span>
                            </label> 
                         </div>
                </div>
            
            </div>
          </div>
          <div className="profileBottom">
              <form className="modifyPasswordForm" action="" onSubmit={handleSubmit(handleModify)}>
                  <label htmlFor="modifyPassword">Modifier votre mot de passe</label>
                  <input 
                    {...register("password", {
                        required: true,
                        pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/
                      })}
                    type="password" id="password" placeholder="Nouveau mot de passe" className='changePassword ProfilePassword' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <div className="password error">
                    {errors?.password?.type === "required" && (<p>Ce champs est obligatoire.</p>)}
                    {errors?.password?.type === "pattern" && (<p>Au moins 8 caractères dont une majuscule une minuscule un chiffre et un symbole.</p>)}
                    </div>
                  {/* <input className="changePassword ProfilePassword" type="password" /> */}
                  <label htmlFor="confirmPassword">Confirmez</label>
                  <input 
                    {...register("ConfirmPassword", {
                        required: true,
                        validate : value => value === password || "Ce n'est pas le même mot de passe"
                      })}
                    type="password" id="Confirmpassword" placeholder="Confirmez" className='confirmPassword ProfilePassword'/>
                    <div className="password error">
                    {errors?.ConfirmPassword?.type === "required" && (<p>Ce champs est obligatoire.</p>)}
                    {errors?.ConfirmPassword?.type === "validate" && (<p>Ce n'est pas le même mot de passe</p>)}
                    </div>
                    <div className="password succes"></div>
                  {/* <input placeholder="Confirmez votre nouveau mot de passe" className="confirmPassword ProfilePassword" type="password" /> */}
                  <button type="submit" className="confirm-btn form-btn">Confirmer</button>
              </form>
              <button className="delete-btn form-btn" onClick={setDeleteConfirm}>Supprimer votre compte</button>
              {DeleteConfirm &&
                    <div className="deleteConfirmation">
                        <p className="deleteMessage">Souhaitez vous vraiment supprimer votre compte ?</p>
                        <button className="deleteValid form-btn" onClick={handleDelete}>Oui</button>
                        <button className="deleteCancel form-btn" onClick={toggleChecked}>Annuler</button>
                    </div>
                     }
          </div>
        </div>
        </div>
    )
}
