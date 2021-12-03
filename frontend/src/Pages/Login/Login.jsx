import './login.scss';
import React, { useState } from "react";
import axios from "axios";

export default function Login() {

    // UseState
    const [email,setEmail] = useState ("");
    const [password,setPassword] = useState ("");

    // Delete Error messages when input is clicked
    const DeleteEmailErrorMessage = (e) =>{
        const emailError = document.querySelector('.email.error');
        

        emailError.innerHTML = "";
    }
    const DeletePasswordErrorMessage = (e) =>{
        const passwordError = document.querySelector('.password.error');
        

        passwordError.innerHTML = "";
    }

    // handleLogin 
    const handleLogin = (e) =>{
        e.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "POST",
            url:"http://localhost:5000/api/login",
            withCredentials: true,
            data:{
                email,
                password
            },
        })
       .then(response =>{
           window.location = "/"
           return response.data
       })
       .then(data =>{
           console.log(data);
       })
       .catch(error =>{
           if(error.response.data.error === "Mot de passe incorrect"){
             passwordError.innerHTML = error.response.data.error;  
           }else{
            emailError.innerHTML = error.response.data.error;  
           }
           
           console.log(error.response.data.error);
       })
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src="/assets/logos/icon-left-font-monochrome-black.svg" alt="" className="loginLogo" />
                    <span className="loginDesc">Bienvenue sur le réseau social de l'entreprise</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form action="" onSubmit={handleLogin} className="loginForm">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" className="loginInput" onClick={DeleteEmailErrorMessage} onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <div className="email error"></div>
                            <label htmlFor="password">Mot de passe</label>
                            <input  type="password" id="password" placeholder="Mot de passe" className='loginInput' onClick={DeletePasswordErrorMessage} onChange={(e) => setPassword(e.target.value)} value={password} required/>
                            <div className="password error"></div>
                            <button input type="submit" className="loginButton">Se connecter</button>
                        </form>
                        <button className="loginRegisterButton" onClick={(e)=> window.location = "/register"}>Créer un compte</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

