import React, { useContext } from 'react';
import "firebase/auth";
import firebaseConfig from './firbase.config'
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css'
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        }
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                const {displayName, email} = result.user;
                const signedInUser = {name: displayName, email}
                setLoggedInUser(signedInUser)
                history.replace(from)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="google-btn">Google sign in</button>
        </div>
    );
};

export default Login;