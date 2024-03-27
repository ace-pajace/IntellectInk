import React from 'react';
import { Button, Card, Grid } from '@chakra-ui/react';
import { Box, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import EditionBlock from './EditionBlock';
import { useEffect } from 'react';
import ApiService from '../ApiService';

interface SubjectBlockProps {   
    semesterNumber: number;
}

const SubjectBlock: React.FC<SubjectBlockProps> = ({semesterNumber}) => {
    // const items = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5", "Subject 6"];
    // const [isOpen, setIsOpen] = useState(false);
    const [activeButton, setActiveButton] = useState<number | null>(null);

    const [userCourses, setUserCourses] = useState<string[]>([]);
    const apiService = new ApiService();
    useEffect(() => {
        // Wywołaj getUserCourses po pierwszym renderowaniu
        apiService.getSubjects(semesterNumber)
            .then(uniqueSubjectNames => {
                setUserCourses(uniqueSubjectNames);
            })
            .catch(error => console.error(error));
    });


    const handleButtonClick = (index: number) => {
        setActiveButton(activeButton === index ? null : index);
    };
    return (
        <Box padding={"10px"}>
            <Card variant={"filled"} margin={"0 0 0 100px"}>
                <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"} >
                    {userCourses.map((item, index) => (
                        <Button key={index} colorScheme='pink' maxW={"200px"} borderRadius={"50px"} margin={"5px"} p={4} onClick={() => handleButtonClick(index)}>
                        {item}
                        </Button>
                    ))} 
                </Grid>
            </Card>
            {userCourses.map((item, index) => (
                <Collapse in={activeButton === index} key={index}>
                    <EditionBlock subjectName={item}/>
                </Collapse>
            ))}
        </Box>
    );
};

export default SubjectBlock;