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

export default function NewSubjectPage() {

    const [subject, setSubject] = useState('');
    const [edition, setEdition] = useState('');
    // const [loginResponse, setLoginResponse] = useState(null);

    const handleCreate = async () => {
        console.log(`Subject: ${subject}, Edition: ${edition}`);
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
                            <FormControl id="subject">
                                <FormLabel>Nowy przedmiot</FormLabel>
                                <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
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
