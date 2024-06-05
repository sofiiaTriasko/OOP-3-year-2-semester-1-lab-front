import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [money, setMoney] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/semester_6_oop_lab_1_back_war/register', {
                name,
                password,
                money
            });
            const result = response.data;
            if (result.success) {
                setMessage('Registration successful!');
                navigate('/login');
            } else {
                setMessage('Registration failed.');
            }
        } catch (error) {
            console.error('There was an error registering!', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Money:
                        <input
                            type="number"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
