import React from 'react';
import { Button, Card, Grid, Spinner } from '@chakra-ui/react';
import { Box, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import EditionsBlock from './EditionsBlock';
import { useEffect } from 'react';
import ApiService from '../ApiService';

interface CoursesBlockProps {   
    semesterNumber: number;
}

const CoursesBlock: React.FC<CoursesBlockProps> = ({semesterNumber}) => {
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [coursesNames, setCoursesNames] = useState<string[]>([]);
    const [errorCoursesNames, setErrorCoursesNames] = useState<string | null>(null);
    const [loadingCoursesNames, setLoadingCoursesNames] = useState<boolean>(false);


    useEffect(() => {
        const fetchCoursesNames = async () => {
            setLoadingCoursesNames(true);
            try {
                const fetchedCoursesNames = await new ApiService().getCoursesForSemester("babla@student.agh.edu.pl", semesterNumber);
                if (Array.isArray(fetchedCoursesNames)) {
                    setCoursesNames(fetchedCoursesNames);
                } else {
                    setErrorCoursesNames('Invalid course names data format');
                }
            } catch (err) {
                setErrorCoursesNames(`Failed to fetch courses names for user for ${semesterNumber} semester`);
            } finally {
                setLoadingCoursesNames(false);
            }
        };

        fetchCoursesNames();
    }, [semesterNumber]);


    const handleButtonClick = (index: number) => {
        setActiveButton(activeButton === index ? null : index);
    };
    return (
        <>
        {loadingCoursesNames ? (
            <Spinner color='pink.500'/>
        ) : errorCoursesNames ? (
            <div>Error: {errorCoursesNames}</div>
        ) : (
            <Box padding={"10px"}>
                <Card variant={"filled"} margin={"0 0 0 100px"}>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"} >
                        {coursesNames.map((name, index) => (
                            <Button 
                                key={index} 
                                colorScheme='pink' 
                                maxW={"200px"} 
                                borderRadius={"50px"} 
                                margin={"5px"} 
                                p={4} 
                                onClick={() => handleButtonClick(index)}
                            >
                                {name}
                            </Button>
                        ))} 
                    </Grid>
                </Card>
                {coursesNames.map((name, index) => (
                    <Collapse in={activeButton === index} key={index}>
                        <EditionsBlock courseName={name} semesterNumber={semesterNumber}/>
                    </Collapse>
                ))}
            </Box>
            )
        }
        </>
    );
};

export default CoursesBlock;