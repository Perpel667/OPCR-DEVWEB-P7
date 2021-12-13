import './navbar.scss'
import { useState } from 'react';
 import { useDispatch } from 'react-redux';
 import { useSelector } from 'react-redux';
 import { useEffect } from 'react';
import { getUser } from "../../actions/user.actions"
import { AiOutlineHome } from "react-icons/ai";
import { Sling as Hamburger } from 'hamburger-react'

export default function Navbar() {

    // hamburger State
    const [isOpen, setOpen] = useState(false)

    const dispatch = useDispatch();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
       dispatch(getUser(userId));
      }, []);

    const userData = useSelector((state) => state.userReducer)

    
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
              <img src="/assets/logos/icon-left-font-monochrome-white.svg" alt="logo Groupomania" className="logo" />  
            </div>
            <div className="navbarRight">
            <div className="navbarLink navbarIcon home" onClick={(e) => window.location = "/"}>
                <AiOutlineHome />
                </div>
            <div className="navbarLinkMobile navbarIcon">
                <Hamburger toggled={isOpen} toggle={setOpen} />
                    {isOpen &&
                    <div className="hamburgerMenu">
                        <p className="hamburgerMenuLinks" onClick={(e)=> window.location = "/profile"}>Mon Profil</p>
                        <p className="hamburgerMenuLinks" onClick={(e)=> window.location = "/"}>Fil d'actualité</p>
                    </div>
                     }
                
                </div>
            <img src={`http://localhost:5000/api/${userData.image}`} alt="profil" className="profilePicture navbarLink" onClick={(e) => window.location = "/profile"} />
            </div>
        </div>
    )
}
