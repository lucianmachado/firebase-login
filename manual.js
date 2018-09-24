firebase.auth().useDeviceLanguage();

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


function createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.reload()
    }).catch(function (error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    console.log('on state changed')
    if (user) {
        document.getElementById('logout').style.display = 'block';
        console.log('SIGNED IN')
        document.getElementById('firebaseui-auth-container').style.display = 'none';
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var divInformacoes = document.getElementById("informacoes")
        divInformacoes.innerHTML = "" + displayName
    } else {
        console.log('SIGNED out')
        document.getElementById('logout').style.display = 'none';
        // ...
    }
});

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
    console.log("NAO NULL");

    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
}