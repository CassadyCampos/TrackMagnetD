import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig }from '../../constants/firebaseConfig'

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    //***** Auth Api *****//
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    //***** User API *****//
    //* To get single user reference *//
    user = uid => this.db.ref(`users/${uid}`);
    //* To get reference of all users in database *//
    users = () => {
        return this.db.ref('users');
    };
    //* Insert user into db *//
    insertUser = (username, email, uid) => {
        const usersRef = this.users();

        usersRef.child(uid).set({
            username: username,
            email: email
        });
    };
}

export default Firebase;
