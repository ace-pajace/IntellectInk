// In case of using a fixed layout on top of all pages, you can use the following code:


import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const UserPanel: React.FC = () => {
    return (
        <Flex bg="teal.500" px={5} py={4} justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color="white">IntellectInk</Text>
            <Text fontSize="lg" fontWeight="bold" color="white">User Panel</Text>
        </Flex>
    );
}

const Navbar: React.FC = () => {
    return (
        <Flex bg="teal.500" px={5} py={4} justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color="white">IntellectInk</Text>
            <Box>
                <Button colorScheme="teal" variant="ghost" mr={4}>Sign In</Button>
                <Button colorScheme="teal" variant="solid">Sign Up</Button>
            </Box>
        </Flex>
    );
}

const Layout: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(false);
    }, []);

    return (
        <>
            {isLoggedIn ? <UserPanel /> : <Navbar />}
            <Outlet />
        </>
    );
}

export default Layout;


