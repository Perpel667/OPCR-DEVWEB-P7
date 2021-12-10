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
              <button>Modifier votre mot de passe</button>
          </div>
        </div>
        </div>
    )
}
