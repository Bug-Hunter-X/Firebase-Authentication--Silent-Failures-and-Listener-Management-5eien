// Improved Firebase Authentication with error handling and proper listener management

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

let unsubscribeFromAuthStateChanged = null;

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Signed in with user:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
      // Inform user about the error
      // ... display appropriate error message to user
    });
}

function manageAuthState() {
  unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("User is signed in with UID:", uid);
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });
}

function cleanup() {
  if (unsubscribeFromAuthStateChanged) {
    unsubscribeFromAuthStateChanged();
    console.log("Unsubscribed from auth state changed");
  }
}

// Example usage
manageAuthState();
// ... later, when component unmounts or is no longer needed
cleanup();