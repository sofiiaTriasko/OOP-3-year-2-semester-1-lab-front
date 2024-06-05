import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

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

        // Load available services
        axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error loading services:', error));
    }, [navigate]);

    const handleServiceSelection = (service) => {
        setSelectedServices([...selectedServices, service]);
    };

    const subscribeService = async (userId, serviceIds) => {
        const url = 'http://localhost:8080/semester_6_oop_lab_1_back_war/payment';

        const formData = new URLSearchParams();
        formData.append('userId', userId);
        serviceIds.forEach(id => formData.append('serviceIds', id));

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error('Request failed', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <DashboardContainer>
            <Header>
                <Title>Subscriber Portal</Title>
            </Header>
            <BlockContainer>
                <Block>
                    <BlockTitle>Available Services</BlockTitle>
                    <ServiceList>
                        {services.map(service => (
                            <ServiceListItem key={service.id}>
                                {service.name} - ${service.price}
                                <Button onClick={() => handleServiceSelection(service)}>Select</Button>
                            </ServiceListItem>
                        ))}
                    </ServiceList>
                </Block>
                <Block>
                    <BlockTitle>Selected Services</BlockTitle>
                    <ServiceList>
                        {selectedServices.map(service => (
                            <ServiceListItem key={service.id}>
                                {service.name} - ${service.price}
                            </ServiceListItem>
                        ))}
                    </ServiceList>
                </Block>
                <Block>
                    <BlockTitle>Billing Summary</BlockTitle>
                    <ServiceList>
                        {selectedServices.map(service => (
                            <ServiceListItem key={service.id}>
                                {service.name} - ${service.price}
                            </ServiceListItem>
                        ))}
                    </ServiceList>
                    <PayButton onClick={() => subscribeService(1, selectedServices.map(service => service.id))}>Pay</PayButton>
                </Block>
            </BlockContainer>
        </DashboardContainer>
    );
};

export default UserDashboard;
