import './navbar.scss'
 import { useDispatch } from 'react-redux';
import { getUser } from "../../actions/user.actions"

export default function Navbar() {

    const dispatch = useDispatch();

    const userId = localStorage.getItem('userId');

    dispatch(getUser(userId));
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
