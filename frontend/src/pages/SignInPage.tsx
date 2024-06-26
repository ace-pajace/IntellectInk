'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import LoginNavbar from "../components/LoginNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../ApiService";

export default function SignInPage() {
  const apiService = new ApiService();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginResponse, setLoginResponse] = useState(null);

  const handleSignIn = async () => {
    console.log(`Username: ${email}, Password: ${password}`);
    const response = await apiService.login(email, password);
    // setLoginResponse(response);
    if (response) {
      navigate('/subjects');
    } else {
      console.log('Login failed');
    }
  }

  return (
    <Box>
      <LoginNavbar />
      <Flex
        // minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign in to access the functionality
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />   
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"pink.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  onClick={handleSignIn} type="submit" as={'a'}
                  bg={"pink.400"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={1}>
                <Text align={"center"}>
                  You don't have an account? <Link color={"pink.400"} onClick={() => navigate('/sign-up')}>Sign up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
