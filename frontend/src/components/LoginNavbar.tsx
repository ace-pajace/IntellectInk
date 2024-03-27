import React from 'react';
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const LoginNavbar: React.FC = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/sign-in');
    }

    const handleSignUpClick = () => {
        navigate('/sign-up');
    }

    return (
        <Flex bg="pink.500" px={5} py={4} justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color="white">IntellectInk</Text>
            <Box>
                <Button onClick={handleSignInClick} colorScheme="pink" variant="ghost" mr={4}>Sign In</Button>
                <Button onClick={handleSignUpClick} colorScheme="pink" variant="solid">Sign Up</Button>
            </Box>
        </Flex>
    );
}

export default LoginNavbar;