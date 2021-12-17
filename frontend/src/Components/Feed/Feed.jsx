import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import Post from '../Post/Post';
import Share from '../Share/Share';
import './feed.scss';

export default function Feed() {
    const [loadPost,setLoadPost] = useState(true);
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer);

    useEffect(()=>{
        if(loadPost){
            dispatch(getPosts());
            setLoadPost(false)
        }
    },[loadPost, dispatch])
    return (
        <div className="Feed">
            <div className="feedWrapper">
                <Share />
                <ul className="postsWrapper">
                    {(posts[0]) && 
                    posts.map((post)=>{
                        return <Post post={post} key={post.id} />
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
