'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function NewCoursePage() {

    const [name, setName] = useState('');
    const [edition, setEdition] = useState('');
    const [term, setTerm] = useState('');
    // const [loginResponse, setLoginResponse] = useState(null);

    const handleCreate = async () => {
        console.log(`Subject: ${name}, Edition: ${edition}`);
        console.log(JSON.stringify({term, name, edition, user: "babla@student.agh.edu.pl" }));
        const response = await fetch('http://localhost:8000/user/courses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({term, name, edition, user: "babla@student.agh.edu.pl" }),
        });
        if (response.ok) {
            console.log('Przedmiot dodany pomyślnie');
        } else {
            console.error('Błąd dodawania przedmiotu');
        }
    }

    return (
        <Box>
            <Flex
                // minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Dodaj nowy przedmiot</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="term">
                                <FormLabel>Semestr</FormLabel>
                                <Input type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
                            </FormControl>
                            <FormControl id="subject">
                                <FormLabel>Nowy przedmiot</FormLabel>
                                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </FormControl>
                            <FormControl id="edition">
                                <FormLabel>Edycja przedmiotu</FormLabel>
                                <Input type="text" value={edition} onChange={(e) => setEdition(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={handleCreate} type="submit" as={'a'}
                                    bg={"pink.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "pink.500",
                                    }}
                                >
                                    Dodaj
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
}
