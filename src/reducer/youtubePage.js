var defaultState = {
    isLoading : true,
    data : [],
    searchingInProgerss : false,
    userName : '',
    userAvatar : '',
    userListIsRefrating : false,

}

export default function youtubePage (state = defaultState, action) {
    if (action.type === 'YOUTUBE_API_LOADING') {
        return Object.assign( ...state, action.payload )
    } 

    else if (action.type === 'YOUTUBE_API_LOADED') {
        return Object.assign( ...state, action.payload )
    } 
    
    else if (action.type === 'STOP_LOADING') {
        
        return Object.assign({}, state, { isLoading : false} )
    } 
    else if (action.type === 'YOUTUBE_SEARCHING_VIDEO_START') {
        return Object.assign({}, state, { searchingInProgerss : true} )
    } 
    else if (action.type === 'YOUTUBE_SEARCHING_VIDEO_STOP') {
        let data = action.payload.items;
        let newState = Object.assign({}, state, { 'data' : {}} )
        newState.data = data;
        return newState;
    } 
    else if (action.type === 'YOUTUBE_AUTH_IN') {
        let newState = Object.assign({}, state, { 'userName': action.payload.userName ,'userAvatar' : action.payload.userAvatar } )
        return newState;
    } 
    else if (action.type === 'YOUTUBE_AUTH_OUT') {
        let newState = Object.assign({}, state, { 'userName': '','userAvatar' : '' } )
        return newState;
    } 
    else if (action.type === 'REFRESH_USER_LISTE_START') {
        let newState = Object.assign({}, state, { 'userListIsRefrating': true} )
        return newState;
    } 
    
    else if (action.type === 'REFRESH_USER_LISTE_STOP') {
        let newState = Object.assign({}, state, { 'userListIsRefrating': false} )
        return newState;
    } 
    else {
        return state
    }
}