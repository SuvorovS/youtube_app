/***** START BOILERPLATE CODE: Load client library, authorize user. *****/

        // Global variables for GoogleAuth object, auth status.
    var GoogleAuth;

    /**
     * Load the API's client and auth2 modules.
     * Call the initClient function after the modules load.
     */

    function handleClientLoad() { // ЗАГРУЗКА КЛИЕНТА API для JS (поставлю на загрузку in redux)
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes

        gapi.client.init({
            'clientId': '66031170828-fb8o4pfreo8vvqjsr219qqa7hf2rmp6b.apps.googleusercontent.com',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
        })
        .then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();

            // Listen for sign-in state changes.
            GoogleAuth.isSignedIn.listen(updateSigninStatus);

            // Handle initial sign-in state. (Determine if user is already signed in.)
            setSigninStatus();

            // Call handleAuthClick function when user clicks on "Authorize" button.
            document.getElementById('execute-request-button').onclick = function() {
                handleAuthClick(event);
            }; 
            document.getElementById('out').onclick = function () {
                handleAuthOutClick(event); 
            }
        });
    }

    function handleAuthClick(event) { // АВТОРИЗАЦИЯ
        // Sign user in after click on auth button.
        GoogleAuth.signIn();
    }
    function handleAuthOutClick(event) { // ВЫХОД
        // Sign user in after click on auth button.
        GoogleAuth.signOut();
    }


    function setSigninStatus() {
        var user = GoogleAuth.currentUser.get();
        console.log('user', user);
        
        isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
        console.log('isAuthorized', isAuthorized);
        
        // Toggle button text and displayed statement based on current auth status.
        if (isAuthorized) {
        //   defineRequest(); !!!!!!!!!11 проба
        }
    }


    function updateSigninStatus(isSignedIn) {
        setSigninStatus();
    }









    function createResource(properties) {
        var resource = {};
        var normalizedProps = properties;
        for (var p in properties) {
        var value = properties[p];
        if (p && p.substr(-2, 2) == '[]') {
            var adjustedName = p.replace('[]', '');
            if (value) {
            normalizedProps[adjustedName] = value.split(',');
            }
            delete normalizedProps[p];
        }
        }
        for (var p in normalizedProps) {
        // Leave properties that don't have values out of inserted resource.
        if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
            var propArray = p.split('.');
            var ref = resource;
            for (var pa = 0; pa < propArray.length; pa++) {
            var key = propArray[pa];
            if (pa == propArray.length - 1) {
                ref[key] = normalizedProps[p];
            } else {
                ref = ref[key] = ref[key] || {};
            }
            }
        };
        }
        return resource;
    }

    function removeEmptyParams(params) {
        for (var p in params) {
            if (!params[p] || params[p] == 'undefined') {
                delete params[p];
            }
        }
        return params;
    }

    var answer;
    function executeRequest(request) {
        request.execute(function(response) {
            answer = response;
        console.log(response);
        });
    }
    
    // "конструктор запроса k Youtube API"
    function buildApiRequest(requestMethod, path, params, properties) {
        params = removeEmptyParams(params);
        var request;
        if (properties) {
        var resource = createResource(properties);
        request = gapi.client.request({
            'body': resource,
            'method': requestMethod,
            'path': path,
            'params': params
        });
        } else {
        request = gapi.client.request({
            'method': requestMethod,
            'path': path,
            'params': params
        });
        }
        // console.log('proba',request);
        
        executeRequest(request);
    }

    /***** END BOILERPLATE CODE *****/

    

    function defineRequest() {
        // See full sample for buildApiRequest() code, which is not 
        // specific to a particular youtube or youtube method.

        // это вызов "конструктора запроса см. buildApiRequest"
        buildApiRequest('GET',
            '/youtube/v3/videos',
            {'chart': 'mostPopular',
            'regionCode': 'US',
            'part': 'snippet,contentDetails,statistics',
            'videoCategoryId': ''});

    }

    handleClientLoad();  //за
