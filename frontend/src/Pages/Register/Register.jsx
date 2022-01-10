import './register.scss'
 import React, { useState } from "react";
 import { useForm } from "react-hook-form";
 import axios from "axios";

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    // UseState
    const [email,setEmail] = useState ("");
    const [name,setName] = useState ("");
    const [firstname,setFirstName] = useState ("");
    const [password,setPassword] = useState ("");


    // Register Request
    const handleRegister = (e) =>{
        

        const emailError = document.querySelector('.email.error');


        axios({
            method: "POST",
            url:"http://localhost:5000/api/register",
            withCredentials: true,
            data:{
                email,
                firstname,
                name,
                password
            },
        })
       .then(response =>{
           window.location = "/login"
           return response.data
       })
       .then(data =>{
           console.log(data);
       })
       .catch(error =>{
           if(error.response.data.includes("email")){
               emailError.innerHTML = "Cet email possede déjà un compte."
           }
           console.log(error.response.data);
           return
       })
    }

 return (
    <div className="register">
    <div className="registerWrapper">
        <div className="registerLeft">
            <img src="/assets/logos/icon-left-font-monochrome-black.svg" alt="logo groupomania" className="registerLogo" />
            <span className="registerDesc">Bienvenue sur le réseau social de l'entreprise</span>
        </div>
        <div className="registerRight">
            <div className="registerBox">
                <form action="" onSubmit={handleSubmit(handleRegister)} className="registerForm">
                    <label htmlFor="email">Email</label>
                    <input
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/
                      })}
                    type="text" id="email" placeholder="Email" className="registerInput" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div className="email error">
                        {errors?.email?.type === "required" && <p className="error">Ce champs est obligatoire.</p>}
                        {errors?.email?.type === "pattern" && <p className="error">Veuillez renseignez un email valide.</p>}
                        </div>
                    <label htmlFor="name">Nom</label>
                    <input
                    {...register("name", {
                        required: true,
                        minLength:2,
                        maxLength: 30,
                        pattern: /^[A-Za-z]+$/i
                      })}
                    type="text" id="name" placeholder="Nom" className="registerInput"  onChange={(e) => setName(e.target.value)} value={name} />
                    <div className="name error">
                    {errors?.name?.type === "required" && <p className="error">Ce champs est obligatoire.</p>}
                    {errors?.name?.type === "maxLength" && ( <p className="error">Ce champs ne peu exceder 30 caractères.</p>)}
                    {errors?.name?.type === "minLength" && ( <p className="error">Ce champs doit avoir 2 caractères minimum.</p> )}
                    {errors?.name?.type === "pattern" && (<p className="error">Ce champs n'accepte pas les chiffres.</p>)}
                    </div>
                    <label htmlFor="firstname">Prénom</label>
                    <input
                    {...register("firstname", {
                        required: true,
                        minLength:2,
                        maxLength: 30,
                        pattern: /^[A-Za-z]+$/i
                      })}
                    type="text" id="firstname" placeholder="Prénom" className="registerInput"  onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                    <div className="firstname error">
                    {errors?.firstname?.type === "required" && <p className="error">Ce champs est obligatoire.</p>}
                    {errors?.firstname?.type === "maxLength" && ( <p className="error">Ce champs ne peu exceder 30 caractères.</p>)}
                    {errors?.firstname?.type === "minLength" && ( <p className="error">Ce champs doit avoir 2 caractères minimum.</p> )}
                    {errors?.firstname?.type === "pattern" && (<p className="error">Ce champs n'accepte pas les chiffres.</p>)}
                    </div>
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                    {...register("password", {
                        required: true,
                        pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/
                      })}
                    type="password" id="password" placeholder="Mot de passe" className='registerInput' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <div className="password error">
                    {errors?.password?.type === "required" && (<p>Ce champs est obligatoire.</p>)}
                    {errors?.password?.type === "pattern" && (<p>Au moins 8 caractères dont une majuscule une minuscule un chiffre et un symbole.</p>)}
                    </div>
                    <button input type="submit" className="registerButton">S'inscrire</button>
                    <button className="registerRegisterButton" onClick={(e)=> window.location = "/login"}>Se connecter</button>
                </form>
            </div>
        </div>
    </div>
</div>
    )
}