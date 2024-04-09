"use client";

import {
    Flex,
    Box,
    FormControl,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    HStack,
    RadioGroup,
    Radio,
    VStack,
  } from "@chakra-ui/react";
import HomeNavbar from "../components/HomeNavbar";

export default function ShareSubjectPage() {
    const user_email = "";

    return (
        <>
            <HomeNavbar />
            <Flex
                // minH={"100vh"}
                align={"center"}
                justify={"center"}
                // bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Udostępnij przedmiot</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <Heading fontSize={"xl"}>Zaproś użytkowników</Heading>
                            <FormControl id="user_email" mb={8}>
                                <HStack>
                                    <Input type="text" value={user_email} placeholder="Email użytkownika"/>
                                    <Button
                                        // onClick={handleSignIn} type="submit" as={'a'}
                                        bg={"pink.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "pink.500",
                                        }}
                                    >
                                        Dodaj
                                    </Button>
                                </HStack>
                            </FormControl> 
                            <Heading fontSize={"xl"}>Tryb</Heading>
                            <FormControl id="user_email" mb={4}>
                                <VStack spacing={5}>
                                    <RadioGroup defaultValue="1" mb={4}>
                                        <HStack spacing="3rem">
                                            <Radio colorScheme="pink.500" value="1">Tylko do odczytu</Radio>
                                            <Radio colorScheme="pink.500" value="2">Do edycji</Radio>
                                        </HStack>
                                    </RadioGroup>
                                    <Button
                                        // onClick={handleSignIn} type="submit" as={'a'}
                                        bg={"pink.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "pink.500",
                                        }}
                                    >
                                        Udostępnij
                                    </Button>
                                </VStack>
                            </FormControl> 
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}