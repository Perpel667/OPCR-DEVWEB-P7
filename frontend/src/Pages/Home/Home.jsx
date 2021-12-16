import './home.scss'
import Navbar from "../../Components/navbar/Navbar";
import Feed from '../../Components/Feed/Feed';

export default function Home() {
    return (
        <div>
          <Navbar /> 
          <div className="homeContainer">
            <Feed />
          </div>
        </div>
    )
}
