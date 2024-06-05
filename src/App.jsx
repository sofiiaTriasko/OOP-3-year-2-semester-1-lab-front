import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: 'Helvetica Neue', sans-serif;
    background: #1e1e2f;
    color: #fff;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
