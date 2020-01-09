import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBmShph92-rnUKeinpcKmUZB9RjeoVAaHg",
    authDomain: "track-magnet.firebaseapp.com",
    databaseURL: "https://track-magnet.firebaseio.com",
    projectId: "track-magnet",
    storageBucket: "track-magnet.appspot.com",
    messagingSenderId: "211391791245",
    appId: "1:211391791245:web:b315bc337d49520f99a2c4",
    measurementId: "G-0CQGFLF8KY"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    // User API
    user = uid => this.db.ref(`users/${uid}`)
    users = () => {
        console.log("this is called");
        console.log(this.db.ref('t4PDQnmqoJVe1n1faGKQQACqVlH2'));
        return this.db.ref('users');
    }

}

export default Firebase;