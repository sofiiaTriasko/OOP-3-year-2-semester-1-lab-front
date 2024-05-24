import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTachometerAlt, faUsers, faChartLine, faCog, faEraser} from '@fortawesome/free-solid-svg-icons';

const AdminDashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
  background: #1e1e2f;
  color: #fff;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #27293d;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
`;

const SidebarTitle = styled.h2`
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #00d4ff;
`;

const SidebarItem = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  background: ${props => (props.active ? '#44475a' : '#32344a')};
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #44475a;
    transform: scale(1.05);
  }

  display: flex;
  align-items: center;
  gap: 10px;
`;

const MainContent = styled.div`
  margin-left: 250px;
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #00d4ff;
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  color: #bbb;
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const UserListItem = styled.li`
  background: #2e2f45;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const BlockButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }
`;

export const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [blockedSubscribers, setBlockedSubscribers] = useState([]);
    const [activeSection, setActiveSection] = useState('UsersWithUnpaidServices');

    const handleBlockSubscriber = (subscriberId) => {
        axios.post(`http://localhost:8080/semester_6_oop_lab_1_back_war/block-user/${subscriberId}`)
            .then(() => {
                setBlockedSubscribers([...blockedSubscribers, subscriberId]);
            })
            .catch(error => console.error('Error blocking subscriber:', error));
    };

    useEffect(() => {
        // Loading users
        axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/user')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error loading users:', error));
    }, []);

    const usersWithUnpaidServices = users.filter(user => user.services && user.services.some(service => service.paymentDataDTO.isPaid === false));
    const usersWithUnpaidConversations = users.filter(user => user.conversations && user.conversations.some(conversation => conversation.payment.isPaid === false));

    const renderSection = () => {
        switch (activeSection) {
            case 'UsersWithUnpaidServices':
                return (
                    <Section>
                        <Subtitle>Users with Unpaid Services</Subtitle>
                        <UserList>
                            {usersWithUnpaidServices.map(user => (
                                <UserListItem key={user.id}>
                                    {user.name}
                                    {user.number}
                                    <BlockButton onClick={() => handleBlockSubscriber(user.id)}>Block</BlockButton>
                                </UserListItem>
                            ))}
                        </UserList>
                    </Section>
                );
            case 'UsersWithUnpaidConversations':
                return (
                    <Section>
                        <Subtitle>Users with Unpaid Conversations</Subtitle>
                        <UserList>
                            {usersWithUnpaidConversations.map(user => (
                                <UserListItem key={user.id}>
                                    {user.name}
                                    {user.number}
                                    <BlockButton onClick={() => handleBlockSubscriber(user.id)}>Block</BlockButton>
                                </UserListItem>
                            ))}
                        </UserList>
                    </Section>
                );
            case 'BlockedSubscribers':
                return (
                    <Section>
                        <Subtitle>Blocked Subscribers</Subtitle>
                        <UserList>
                            {blockedSubscribers.map(id => (
                                <UserListItem key={id}>Subscriber {id} is blocked</UserListItem>
                            ))}
                        </UserList>
                    </Section>
                );
            default:
                return null;
        }
    };

    return (
        <AdminDashboardContainer>
            <Sidebar>
                <SidebarTitle>Admin Menu</SidebarTitle>
                <SidebarItem active={activeSection === 'UsersWithUnpaidServices'} onClick={() => setActiveSection('UsersWithUnpaidServices')}>
                    <FontAwesomeIcon icon={faTachometerAlt} /> Users with Unpaid Services
                </SidebarItem>
                <SidebarItem active={activeSection === 'UsersWithUnpaidConversations'} onClick={() => setActiveSection('UsersWithUnpaidConversations')}>
                    <FontAwesomeIcon icon={faUsers} /> Users with Unpaid Conversations
                </SidebarItem>
                <SidebarItem active={activeSection === 'BlockedSubscribers'} onClick={() => setActiveSection('BlockedSubscribers')}>
                    <FontAwesomeIcon icon={faEraser} /> Blocked Subscribers
                </SidebarItem>
            </Sidebar>
            <MainContent>
                <Title>Admin Portal</Title>
                {renderSection()}
            </MainContent>
        </AdminDashboardContainer>
    );
};
