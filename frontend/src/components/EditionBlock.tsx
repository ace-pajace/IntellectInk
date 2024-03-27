import React from 'react';
import { Button, Card, HStack } from '@chakra-ui/react';
import { Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';

const EditionBlock: React.FC = () => {
    const items = ["Edition 1", "Edition 2", "Edition 3", "Edition 4", "Edition 5", "Edition 6"];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box maxW={"1500px"}>
            <HStack padding={"10px"}>
                <Button colorScheme="pink" alignSelf={"baseline"} variant="outline" minH={"50px"} margin={"10px"}>Utwórz nową edycję</Button>
                <Card variant={"filled"} bg={"pink.100"} minW={"1000px"} onClick={() => setIsOpen(!isOpen)}>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"}>
                        {items.map((item, index) => (
                            <Button key={index} colorScheme='blue' borderRadius={"50px"} margin={"5px"} p={4}>
                            {item}
                            </Button>
                        ))} 
                    </Grid>
                </Card>
            </HStack>
            {/* <Collapse in={isOpen}>
                Siema
            </Collapse> */}
        </Box>
    );
};

export default EditionBlock;