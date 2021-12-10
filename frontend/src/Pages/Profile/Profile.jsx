import Navbar from '../../Components/navbar/Navbar';
import { useSelector } from 'react-redux';
import './profile.scss';
import profileBackground from '../../assets/images/profile-background2.jpeg';


export default function Profile() {

    const userData = useSelector((state) => state.userReducer)
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
              <form className="modifyPasswordForm" action="" method="post">
                  <label htmlFor="modifyPassword">Modifier votre mot de passe</label>
                  <input className="changePassword password" type="password" />
                  <label htmlFor="confirmPassword">Confirmez</label>
                  <input className="confirmPassword password" type="password" />
                  <button className="confirm-btn btn">Confirmer</button>
              </form>
              <button className="delete-btn btn">Supprimer votre compte</button>
          </div>
        </div>
        </div>
    )
}
