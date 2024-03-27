import React from 'react';
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const HomeNavbar: React.FC = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/subjects');
    }
    return (
        <Flex bg="pink.500" px={5} py={4} >
            <Text fontSize="lg" fontWeight="bold" color="white" onClick={handleGoHome}>IntellectInk - Home Page</Text>
        </Flex>
    );
}
export default HomeNavbar;