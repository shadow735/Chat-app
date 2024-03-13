// frontend/src/components/Auth.js

import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const register = () => {
        axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/register",
        }).then((res) => console.log(res));
    };

    const login = () => {
        axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
        }).then((res) => console.log(res));
    };

    return (
        <div>
            <div>
                <h1>Register</h1>
                <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
                <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
                <button onClick={register}>Submit</button>
            </div>
            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
                <input placeholder="password" onChange={e => setLoginPassword(e.target.value)} />
                <button onClick={login}>Submit</button>
            </div>
        </div>
    );
};

export default Auth;