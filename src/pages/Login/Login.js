import React, { useState } from 'react';
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setIsLoggedIn, setUserId }) {
    const [loginInput, setloginInput] = useState('')
    const [loginPasswordInput, setloginPasswordInput] = useState('')

    const handleInputChange = (e) => {
        if (e.target.id === "login") {
            setloginInput(e.target.value)
        } else if (e.target.id === "loginPassword") {
            setloginPasswordInput(e.target.value)
        }
    }

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const userObj = {
            login: loginInput,
            password: loginPasswordInput
        }
        API.login(userObj).then(data => {
            
            if (data.token) {
                setToken(data.token);
                setIsLoggedIn(true);
                setUserId(data.user.id)
                localStorage.setItem("token", data.token)
                setloginInput("");
                setloginPasswordInput("")
                navigate("/home");
            } else {
                console.log(data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <main>
            <div className="loginBody">
                <div id="loginCard">
                    <form onSubmit={handleLogin} className="loginForm" id="loginForm">
                        <input type="text" id="login" placeholder="email or username" value={loginInput} onChange={handleInputChange} autoComplete='username' />
                        <input type="password" id="loginPassword" placeholder="password" value={loginPasswordInput} onChange={handleInputChange} autoComplete='current-password' />
                        <button className="loginBttn">Login</button>
                    </form>
                    <div id="signUpCard">
                        <p>No acount yet? Come join us!</p>
                        <button id="signUpBttn">Create Account</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;