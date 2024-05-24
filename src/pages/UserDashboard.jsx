import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

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

const Subtitle = styled.h3`
  color: #bbb;
  font-size: 1.8em;
  margin-bottom: 20px;
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

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const ServiceListItem = styled.li`
  background: #44475a;
  border-radius: 4px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: #5a5c7a;
  }
`;

const Button = styled.button`
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

const PayButton = styled(Button)`
  background-color: #00d4ff;
  color: #333;
  margin-top: 20px;

  &:hover {
    background-color: #00b3cc;
  }
`;

export const UserDashboard = () => {
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        // Load available services
        axios.get('http://localhost:8080/semester_6_oop_lab_1_back_war/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error loading services:', error));
    }, []); // Added empty dependency array to run the effect only once

    const handleServiceSelection = (service) => {
        setSelectedServices([...selectedServices, service]);
    };

    const subscribeService = async (userId, serviceIds) => {
        const url = 'http://your-api-endpoint/your-endpoint-path'; // replace with your actual endpoint URL

        // Construct the URL-encoded form data
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
                console.log(response.data); // "success"
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
