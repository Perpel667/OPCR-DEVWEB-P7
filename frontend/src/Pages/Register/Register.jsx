import './register.scss'

export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <img src="/assets/logos/icon-left-font-monochrome-black.svg" alt="" className="loginLogo" />
                    <span className="loginDesc">Bienvenue sur le réseau social de l'entreprise</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input type="email" placeholder="Email" className="loginInput" />
                        <input placeholder="Nom" className="loginInput" />
                        <input placeholder="Prenom" className="loginInput" />
                        <input  placeholder="Mot de passe" className="loginInput" />
                        <input  placeholder="Confirmer le mot de passe" className="loginInput" />
                        <button className="loginButton">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    )
}