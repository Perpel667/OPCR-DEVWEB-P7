import './register.scss'

export default function Register() {

 return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <img src="/assets/logos/icon-left-font-monochrome-black.svg" alt="" className="registerLogo" />
                    <span className="registerDesc">Bienvenue sur le réseau social de l'entreprise</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input type="email" placeholder="Email" className="registerInput" />
                        
                        <input placeholder="Nom" className="registerInput" />
                        
                        <input placeholder="Prenom" className="registerInput" />
                        
                        <input  placeholder="Mot de passe" className="registerInput" />
                       
                        <input  placeholder="Confirmer le mot de passe" className="registerInput" />
                        
                        <button className="registerButton">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    )
}