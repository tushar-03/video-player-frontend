// src/components/Login.js
import React, { useState } from 'react';
import api from '../API'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Call useNavigate() to get the navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { firstName, password });
            console.log(response);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Navigate to /profile after a successful login
            navigate('/profile');

        } catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                <Link to="/register">
                    <button type="button">Create Account</button>
                </Link>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
