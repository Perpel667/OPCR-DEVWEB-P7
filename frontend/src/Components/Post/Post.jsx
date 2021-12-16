import {useState} from 'react';
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";
import './post.scss';

export default function Post({post}) {

    const [isLoading,setIsLoading] = useState(true);
     
    return (
        <li className="card-container" key={post.id}>
            {isLoading ? (
                <FaCircleNotch class="icon-spin"/>
            ): (
                <h2>oui</h2>
            )}
        </li>
    )
}
