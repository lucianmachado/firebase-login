function logout() {
    firebase.auth().signOut().then(function () {
        window.location.reload()
    }).catch(function (error) {
        // An error happened.
    });
}

function createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function login() {
    var email = document.getElementById('emailLogin').value;
    var password = document.getElementById('passwordLogin').value;
    console.log(email, password)
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

window.addEventListener('load', () => {
    firebase.auth().useDeviceLanguage();

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                console.log("RESULT: ", authResult)
                console.log("URL ", redirectUrl)
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('logout').style.display = 'block';
            console.log('SIGNED IN ',user)
            document.getElementById('firebaseui-auth-container').style.display = 'none';
            document.getElementById('informacoes').style.display = 'block';
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var divInformacoes = document.getElementById("user-info")
            divInformacoes.innerHTML = "<img src=" + photoURL + "></img>" +
             "" + displayName +
             "<br>" + email + 
             "<br>" + emailVerified + 
             "<br>" + isAnonymous + 
             "<br>" + uid + "<hr>"
        } else {
            console.log('SIGNED out')
            document.getElementById('logout').style.display = 'none';
            document.getElementById('informacoes').style.display = 'none';
            document.getElementById('firebaseui-auth-container').style.display = 'block';
        }
    });
});
