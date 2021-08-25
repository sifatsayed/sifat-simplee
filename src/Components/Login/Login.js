

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
    password: '', 
   
  });

  initializeLoginFramework()
  const [loggedInUser , setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
      handleResponse (res , true)
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res =>{
     handleResponse(res,false)
    })
  }
  const handleSubmit = (e) => {
   // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name , user.email , user.password)
        .then(res =>{
         handleResponse(res, true)
        })
    }

    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          handleResponse(res,true)
        })
    }
    e.preventDefault()
  }

  const handleResponse = (res ,redirect) => {
      setUser(res)
      setLoggedInUser(res)
      if(redirect){
        history.replace(from);
      }
  }
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /^(?=.{6,20}$)\D*\d/.test(e.target.value)
      isFormValid = (isPasswordValid && passwordHasNumber)

    }
    if (isFormValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
    //console.log(e.target.value, e.target.name)
  }
  

  return (
    <div style ={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignIn &&
        <div>
          
        </div>
      }
      <form onSubmit={handleSubmit}>
        <h2>Our Own Authentication</h2>
        <input type="checkbox" name="newUser" id="" onChange={() => setNewUser(!newUser)} />
        <label htmlFor="newUser">New User</label>
        <br />
        {newUser && <input type="text" name="name" placeholder="Your name" onBlur={handleBlur} />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
        <br />
        <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Enter Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ?'Created':'Logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
