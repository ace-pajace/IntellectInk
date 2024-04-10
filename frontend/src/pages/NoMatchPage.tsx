import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoMatchPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear(to-r, pink.500,blue.500)"
    >
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="2xl" color="white">
          404
        </Heading>
        <Text fontSize="2xl" color="whiteAlpha.900">
          Oops! Page not found.
        </Text>
        <Button colorScheme="pink" as={Link} to="/">
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NoMatchPage;