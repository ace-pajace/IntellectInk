import React from 'react';
import { Button, Card, Grid } from '@chakra-ui/react';
import { Box, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import EditionBlock from './EditionBlock';

const SubjectBlock: React.FC = () => {
    const items = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5", "Subject 6"];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box padding={"10px"}>
            <Card variant={"filled"} margin={"0 0 0 100px"} width={"1000px"}>
                <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"} >
                    {items.map((item, index) => (
                        <Button key={index} colorScheme='pink' borderRadius={"50px"} margin={"5px"} p={4} onClick={() => setIsOpen(!isOpen)}>
                        {item}
                        </Button>
                    ))} 
                </Grid>
            </Card>
            <Collapse in={isOpen}>
                <EditionBlock />
            </Collapse>
        </Box>
    );
};

export default SubjectBlock;