import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
    else {
        firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success : true ,
            }
            return (signInUser);
            //console.log(displayName, email, photoURL);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message)
        })
};


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {

                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false,
            }
            return (signOutUser)
        })
        .catch(err => {
            console.log(err)
            console.log(err.message)
        })
}


  export const createUserWithEmailAndPassword = (name ,email ,password) => {
    return firebase.auth().createUserWithEmailAndPassword(name,email,password)
    .then((res) => {
      const newUserInfo = res.user
      newUserInfo.error = '';
      newUserInfo.success = true;
      updatedUserName(name)
      return newUserInfo;

      //console.log(res)
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo ;
    });
  }


  export const signInWithEmailAndPassword = (email ,password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then((res) => {
      const newUserInfo = res.user   
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo
     
      //console.log('sign is user info' , res.user)
    //  console.log(res)
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo ;
    });
  }

  const updatedUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(() => {
      console.log('updated user name successfully')
    }).catch((error) => {
      console.log(error)
    });  
  }