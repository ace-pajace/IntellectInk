import React from 'react';
import { Flex, Text } from "@chakra-ui/react";

const HomeNavbar: React.FC = () => {
    return (
        <Flex bg="teal.500" px={5} py={4} >
            <Text fontSize="lg" fontWeight="bold" color="white">IntellectInk - Home Page</Text>
        </Flex>
    );
}
export default HomeNavbar;