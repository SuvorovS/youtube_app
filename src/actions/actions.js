export const Loading = ()=> {
    return dispatch => {
        dispatch({type : 'START_LOADING'});
        
        // setTimeout(function() {

            dispatch({type : 'gapi.load'});

            gapiClientLoad(dispatch);

            // dispatch({type : 'STOP_LOADING'});
            
        // }, 2000);
    }
}


function gapiClientLoad(dispatch) { // ЗАГРУЗКА КЛИЕНТА API для JS (поставлю на загрузку in redux)
        gapi.load('client:auth2', initClient.bind(this, dispatch)); // каринг dispatch
}

function initClient(dispatch) {
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes

    gapi.client.init({
        'clientId': '66031170828-fb8o4pfreo8vvqjsr219qqa7hf2rmp6b.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
    })
    .then( ()=> {
        
        window.GoogleAuth = gapi.auth2.getAuthInstance(); // делаю глобальным, мотому что в store не могу отправить, выдает ошибку см. комент "!! не работает"
        console.log('GoogleAuth', GoogleAuth);
        console.log('GoogleAuth is ', typeof GoogleAuth);
        
        // window.GoogleAuth = gapi.auth2.getAuthInstance();
        
        dispatch({type : 'STOP_LOADING'});


        // dispatch({type : 'GOOGLE_AUTH', payload : {'GoogleAuth' : GoogleAuth}}); // !! не работает (((
        // console.log(GoogleAuth);
        
        // dispatch({type : 'GOOGLE_AUTH'});

        // Listen for sign-in state changes.
        // GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        // setSigninStatus();

        // Call handleAuthClick function when user clicks on "Authorize" button.
        // document.getElementById('execute-request-button').onclick = function() {
        //     handleAuthClick(event);
        // }; 
        // document.getElementById('out').onclick = function () {
        //     handleAuthOutClick(event); 
        // }

        // dispatch({type : 'STOP_LOADING'});
    });
}

export const youtubeAuthOut = ()=> {
    return dispatch=>{
        GoogleAuth.signOut().then((e)=>{
            console.log(e);
        }); // проверить     
        dispatch({type : 'YOUTUBE_AUTH_OUT'});
        window.location.href = 'http://localhost:4000/#/'; //смена url для перенаправления на страницу поиска

    }  
}

export const youtubeAuthIn = ()=> { // авторизация вытинуть весь контент по юзеру и закинуть в стор
    return dispatch =>{
        GoogleAuth.signIn().then((userObj)=>{
            dispatch( {type : 'YOUTUBE_AUTH_IN', payload: {'userAvatar': userObj.w3.Paa, 'userName': userObj.w3.ig}});
        });
    }
}


export const youtubeSearchVideo = (searchQuerryTitle, searchQuerryQuantity)=> {
    return dispatch => {
        window.location.href = 'http://localhost:4000/#/'; //смена url для перенаправления на страницу поиска
        dispatch({type : 'YOUTUBE_SEARCHING_VIDEO_START'});
        console.log('searchQuerryTitle',searchQuerryTitle);
        console.log('searchQuerryQuantity',searchQuerryQuantity);
        
        //запрос к API
        gapi.client.request({
            'method': 'GET',
            'path': '/youtube/v3/search',
            'params':{'key': 'AIzaSyB_-pYMA9i-vE9bObK2SroUgvvaP6A35Ho','maxResults': searchQuerryQuantity, 'part': 'snippet', 'q' : searchQuerryTitle}
        }).execute((res)=>{
            console.log(res);
            dispatch({type : 'YOUTUBE_SEARCHING_VIDEO_STOP', payload : res});
        });
    }
}


export const refreshUserLists = ()=>{
    return (dispatch)=>{
        dispatch({type : 'REFRESH_USER_LISTE_START'});
        setTimeout(function() {
            // запросы к API на получение всех данных по user,
            // user берется из store (ворос: как сюда передать дынные из store?)

            dispatch({type : 'REFRESH_USER_LISTE_STOP'});
        }, 2000);
    }
}