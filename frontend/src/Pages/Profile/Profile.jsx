import Navbar from '../../Components/navbar/Navbar';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import axios from "axios";
import './profile.scss';
import profileBackground from '../../assets/images/profile-background2.jpeg';


export default function Profile() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [password,setPassword] = useState ("");



    const userData = useSelector((state) => state.userReducer)

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
    return (
        <div>
            <Navbar />
            <div className="profile">
          <div className="profileTop">
            <div className="profileTitle">
                <img className="profileCoverImg" src={profileBackground} alt="" />
            <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="profileUserImg" />
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
                    type="password" id="Confirmpassword" placeholder="Confirmez votren nouveau mot de passe" className='confirmPassword ProfilePassword'/>
                    <div className="password error">
                    {errors?.ConfirmPassword?.type === "required" && (<p>Ce champs est obligatoire.</p>)}
                    {errors?.ConfirmPassword?.type === "validate" && (<p>Ce n'est pas le même mot de passe</p>)}
                    </div>
                    <div className="password succes"></div>
                  {/* <input placeholder="Confirmez votre nouveau mot de passe" className="confirmPassword ProfilePassword" type="password" /> */}
                  <button type="submit" className="confirm-btn btn">Confirmer</button>
              </form>
              <button className="delete-btn btn">Supprimer votre compte</button>
          </div>
        </div>
        </div>
    )
}
