import { firebase } from "../lib/firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

import {
  singInWithGoogleInfoToFB,
  signInWithFacebookInfoToFB,
  doesEmailExist,
} from "../service/firebase/firebase";

export const signInWithGoogle = (navi: any) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result: any) => {
      doesEmailExist(result.additionalUserInfo.profile.email).then((r) => {
        if (!r) {
          singInWithGoogleInfoToFB(result).then(() => {
            navi("/");
          });
        } else {
          navi("/");
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Sign out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};

export const signInWithFacebook = (navi: any) => {
  const provider = new FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  provider.setCustomParameters({
    display: "popup",
  });

  provider.addScope("user_birthday");
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      signInWithFacebookInfoToFB(result);
      navi("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
