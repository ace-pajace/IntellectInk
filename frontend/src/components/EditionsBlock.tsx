import React from 'react';
import { Button, Card, HStack, Spinner } from '@chakra-ui/react';
import { Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import NewEditionPopover from './NewEditionPopover';
import ApiService from '../ApiService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface EditionsBlockProps {
    courseName: string;
    semesterNumber: number;
}

const EditionsBlock: React.FC<EditionsBlockProps> = ({courseName, semesterNumber}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [courseEditions, setCourseEditions] = useState<string[]>([]);
    const [errorCourseEditions, setErrorCourseEditions] = useState<string | null>(null);
    const [loadingCourseEditions, setLoadingCourseEditions] = useState<boolean>(false);


    useEffect(() => {
        const fetchCourseEditions = async () => {
            setLoadingCourseEditions(true);
            try {
                const fetchedCourseEditions = await new ApiService().getCoursesEditions("babla@student.agh.edu.pl", semesterNumber, courseName);
                if (Array.isArray(fetchedCourseEditions)) {
                    setCourseEditions(fetchedCourseEditions);
                } else {
                    setErrorCourseEditions('Invalid course edition data format');
                }
            } catch (err) {
                setErrorCourseEditions(`Failed to fetch course editions for user for ${courseName} course`);
            } finally {
                setLoadingCourseEditions(false);
            }
        };

        fetchCourseEditions();
    }, [courseName, semesterNumber]);

    return (
        <>
        {loadingCourseEditions ? (
            <Spinner color='pink.500'/>
        ) : errorCourseEditions ? (
            <div>Error: {errorCourseEditions}</div>
        ) : (
            <Box maxW={"1500px"}>
                <HStack padding={"10px"}>
                    <NewEditionPopover />
                    {/* <Button colorScheme="pink" alignSelf={"baseline"} variant="outline" minH={"50px"} margin={"10px"}>Utwórz nową edycję</Button> */}
                    <Card variant={"filled"} bg={"pink.100"}  onClick={() => setIsOpen(!isOpen)}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={4} padding={"15px"}>
                            {courseEditions.map((item, index) => (
                                <Button 
                                    key={index} 
                                    colorScheme='blue' 
                                    borderRadius={"50px"} 
                                    margin={"5px"} 
                                    p={4}
                                    onClick={() => navigate("/courseEditionView")}
                                >
                                    {item[0]}
                                </Button>
                            ))} 
                        </Grid>
                    </Card>
                </HStack>
            </Box>
            )
        }
        </>
    );
};

export default EditionsBlock;