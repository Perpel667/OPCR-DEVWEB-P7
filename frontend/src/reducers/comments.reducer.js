import { GET_COMMENTS,EDIT_COMMENT } from "../actions/comments.actions";


const initialState = {};

export default function commentReducer(state = initialState, action) {
    switch(action.type){
        case GET_COMMENTS:
            return action.payload;
        case EDIT_COMMENT : 
            return action.payload;
        default:
            return state;
        
    }
}