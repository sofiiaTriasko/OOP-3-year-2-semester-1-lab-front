import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: 'Helvetica Neue', sans-serif;
  background: #1e1e2f;
  color: #fff;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #00d4ff;
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  flex-wrap: wrap;
`;

const Block = styled.div`
  background: #2e2f45;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const BlockTitle = styled.h4`
  color: #00d4ff;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/checkAuth', { withCredentials: true });
                if (!response.data.authenticated) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate('/login');
            }
        };

        checkAuth();

        // Load users
        axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error loading users:', error));

        // Load services
        axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error loading services:', error));
    }, [navigate]);

    return (
        <DashboardContainer>
            <Header>
                <Title>Admin Dashboard</Title>
            </Header>
            <BlockContainer>
                <Block>
                    <BlockTitle>Users</BlockTitle>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </Block>
                <Block>
                    <BlockTitle>Services</BlockTitle>
                    <ul>
                        {services.map(service => (
                            <li key={service.id}>{service.name} - ${service.price}</li>
                        ))}
                    </ul>
                </Block>
            </BlockContainer>
        </DashboardContainer>
    );
};

export default AdminDashboard;
