import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

let config = {
    apiKey: "AIzaSyD7RB3pWWZpcOUuDSj-_6Q-w-ZMqAKh4CI",
    authDomain: "insta-7bd18.firebaseapp.com",
    databaseURL: "https://insta-7bd18.firebaseio.com",
    projectId: "insta-7bd18",
    storageBucket: "insta-7bd18.appspot.com",
    messagingSenderId: "575713888429",
    appId: "1:575713888429:web:7603c8fc68a6ef30b55e24",
    measurementId: "G-8VG7GM2CW4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const RegisterWithGoogle = () => auth.re;

export default firebase;
