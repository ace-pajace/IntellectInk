import React from 'react';
import { Button, Card, HStack } from '@chakra-ui/react';
import { Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import NewEditionPopover from './NewEditionPopover';
import ApiService from '../ApiService';
import { useEffect } from 'react';

interface EditionBlockProps {
    subjectName: string;
}

const EditionBlock: React.FC<EditionBlockProps> = ({subjectName}) => {
    // const items = ["Edition 1", "Edition 2", "Edition 3", "Edition 4", "Edition 5", "Edition 6"];
    const [isOpen, setIsOpen] = useState(false);

    const [editions, setEditions] = useState<string[]>([]);
    const apiService = new ApiService();
    useEffect(() => {
        // Wywołaj getUserCourses po pierwszym renderowaniu
        apiService.getEditions(subjectName)
            .then(subjectEditions => {
                setEditions(subjectEditions);
            })
            .catch(error => console.error(error));
    });

    return (
        <Box maxW={"1500px"}>
            <HStack padding={"10px"}>
                <NewEditionPopover />
                {/* <Button colorScheme="pink" alignSelf={"baseline"} variant="outline" minH={"50px"} margin={"10px"}>Utwórz nową edycję</Button> */}
                <Card variant={"filled"} bg={"pink.100"}  onClick={() => setIsOpen(!isOpen)}>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"}>
                        {editions.map((item, index) => (
                            <Button key={index} colorScheme='blue' borderRadius={"50px"} margin={"5px"} p={4}>
                            {item}
                            </Button>
                        ))} 
                    </Grid>
                </Card>
            </HStack>
        </Box>
    );
};

export default EditionBlock;