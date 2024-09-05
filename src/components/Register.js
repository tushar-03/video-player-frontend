// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', {
                firstName,
                lastName,
                email,
                phoneNumber,
            });

            // On success, store the token and navigate to the profile page
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            handleRegistrationSuccess(); // Call the success callback
        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        }
    };

    const handleRegistrationSuccess = () => {
        // Navigate to the profile page
        navigate('/profile');
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
