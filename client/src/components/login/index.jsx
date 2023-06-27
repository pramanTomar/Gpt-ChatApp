import React from 'react'
import { useState, useEffect } from 'react';
import { usePostSignupMutation, usePostLoginMutation } from '@/state/api';

const Login = ({setUser, setSecret}) => {

  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [triggerLogin, responseLogin] = usePostLoginMutation();
  const [triggerSignup] = usePostSignupMutation();

  const handleSignup = () => {
    triggerSignup({username, password});
  }

  const handleLogin = () => {
    triggerLogin({username, password});
  }

  useEffect(() => {
    if(responseLogin.data?.response){
        setUser(username);
        setSecret(password);
    }
  }, [responseLogin.data])

  return (
    <div className='login-page'>
        <div className='login-container'>
            <h2 className='title'>GPT CHAT APP</h2>

            <h2>{isSignup ? 'SignUp' : 'Login'}</h2>

            <div>
                <input type="text" className='login-input' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" className='login-input' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className='login-actions'>
                <p className='register-change' onClick={() => setIsSignup(!isSignup)}>
                    {
                        isSignup ? 'Already a user?' : 'Create a new account'
                    }
                </p>
                <button type='button' className='login-btn' onClick={isSignup ? handleSignup : handleLogin}>
                    {
                        isSignup ? 'Register' : 'Login'
                    }
                </button>
            </div>

            
        </div>
    </div>
  )
}

export default Login;
