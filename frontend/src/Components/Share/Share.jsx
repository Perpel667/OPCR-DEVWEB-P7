import { useSelector } from 'react-redux';
import { GoFileMedia } from "react-icons/go";
import './share.scss'


export default function Share() {
    const userData = useSelector((state) => state.userReducer);
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                     <img src={`http://localhost:5000/api/${userData.image}`} alt="" className="shareProfilePicture"/>
                    <input placeholder="Exprimez-vous" className="shareInput" />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                        <GoFileMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Ajouter une photo</span>
                        </div>
                    </div>
                    <button className="shareButton">Publier</button>
                </div>
            </div>
        </div>
    )
}
