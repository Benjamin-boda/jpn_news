import {firebase, firebaseAuth} from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = () => {
    return () => {
        return firebaseAuth.signInAnonymously();
    };
};

export const logout = (uid) => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};