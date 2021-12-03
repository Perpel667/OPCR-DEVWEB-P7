import './register.scss'
 import React, { useState } from "react";
 import axios from "axios";

export default function Register() {

    // UseState
    const [email,setEmail] = useState ("");
    const [name,setName] = useState ("");
    const [firstname,setFirstName] = useState ("");
    const [password,setPassword] = useState ("");


    // Register Request
    const handleRegister = (e) =>{
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const nameError = document.querySelector('.name.error');
        const firstNameError = document.querySelector('.firstname.error')
        const passwordError = document.querySelector('.password.error');

        let message = "";
        let error = false;

        if(name.length < 2 || name.length > 30){
            nameError.innerHTML = "Doit contenir entre 2 et 30 caractères."
            return
        } if (firstname.length < 2 || firstname.length > 30){
            firstNameError.innerHTML = "Doit contenir entre 2 et 30 caractères."
            return
        }if (password.length < 8 ) {
          message += "Le mot de passe doit contenir au moins 8 caractères. ";
          error = true;
        }
        if (password.search(/[a-z]/) === -1) {
          message += "Le mot de passe doit contenir au moins 1 minuscule. ";
          error = true;
        }
        if (password.search(/[A-Z]/) === -1) {
          message += "Le mot de passe doit contenir au moins 1 majuscule. ";
          error = true;
        }
        if (password.search (/[0-9]/) < 2) {
          message += "Le mot de passe doit contenir au moins 2 chiffres.";
          error = true;
        }
        if (error) {
          passwordError.innerHTML = message;
          return false;
        }

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
            <img src="/assets/logos/icon-left-font-monochrome-black.svg" alt="" className="registerLogo" />
            <span className="registerDesc">Bienvenue sur le réseau social de l'entreprise</span>
        </div>
        <div className="registerRight">
            <div className="registerBox">
                <form action="" onSubmit={handleRegister} className="registerForm">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" className="registerInput" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <div className="email error"></div>
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" placeholder="Nom" className="registerInput"  onChange={(e) => setName(e.target.value)} value={name} required />
                    <div className="name error"></div>
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" placeholder="Prénom" className="registerInput"  onChange={(e) => setFirstName(e.target.value)} value={firstname} required />
                    <div className="firstname error"></div>
                    <label htmlFor="password">Mot de passe</label>
                    <input  type="password" id="password" placeholder="Mot de passe" className='registerInput' onChange={(e) => setPassword(e.target.value)} value={password} required/>
                    <div className="password error"></div>
                    <button input type="submit" className="registerButton">S'inscrire</button>
                    <button className="registerRegisterButton" onClick={(e)=> window.location = "/login"}>Se connecter</button>
                </form>
            </div>
        </div>
    </div>
</div>
    )
}