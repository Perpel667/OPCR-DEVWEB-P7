import './navbar.scss'

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
              <img src="/assets/logos/icon-left-font-monochrome-white.svg" alt="logo Groupomania" className="logo" />  
            </div>
            <div className="navbarRight">
                <span className="navbarLink">Page d'acceuil</span>
                <span className="navbarLink">Profil</span>
            </div>
        </div>
    )
}
