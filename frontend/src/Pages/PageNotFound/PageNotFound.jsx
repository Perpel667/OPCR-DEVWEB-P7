import React from 'react'
import "./pagenotfound.scss";
import Error from "../../assets/images/404errorimage.JPG"

export default function PageNotFound() {
    return (
        <div className="pnf">
            <h1 className="pnf title-first">Oups !</h1>
            <img src={Error} alt="" />
            <h2 className="pnf title-second">LA PAGE N'EXISTE PAS</h2>
            <button className="return-btn" onClick={(e)=> window.location="/"}>Retour a l'acceuil</button>
        </div>
    )
}
