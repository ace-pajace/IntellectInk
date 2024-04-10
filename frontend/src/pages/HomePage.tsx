import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import SemesterBlock from '../components/SemesterBlock';
import { useState } from 'react';
import { useEffect } from 'react';
import ApiService from '../ApiService';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSemester, setActiveSemester] = useState<number | null>(null);
    const [semestersNumbers, setSemestersNumbers] = useState<number[]>([]);
    const [errorSemestersNumbers, setErrorSemestersNumbers] = useState<string | null>(null);
    const [loadingSemestersNumbers, setLoadingSemestersNumbers] = useState<boolean>(false);


    useEffect(() => {
        const fetchSemestersNumbers = async () => {
            setLoadingSemestersNumbers(true);
            try {
                const fetchedSemestersNumbers = await new ApiService().getSemestersNumbersForUser("babla@student.agh.edu.pl");
                if (Array.isArray(fetchedSemestersNumbers)) {
                    setSemestersNumbers(fetchedSemestersNumbers);
                } else {
                    setErrorSemestersNumbers('Invalid semesters numbers data format');
                }
            } catch (err) {
                setErrorSemestersNumbers('Failed to fetch semesters numbers for user');
            } finally {
                setLoadingSemestersNumbers(false);
            }
        };

        fetchSemestersNumbers();
    }, []);

    const handleSemesterClick = (semesterNumber: number) => {
        if (activeSemester === semesterNumber) {
            setActiveSemester(null);
            return;
        } 
        setActiveSemester(semesterNumber);
    };

    const handleCreateNewSubject = () => {  
        navigate('/subjects/create');
    }

    return (
        <Box>
            <HomeNavbar children={[]} />
            {/* Rest of the page content */}
            <Box padding={"50px"}>
                <HStack spacing={4} align="stretch">
                    {/* minW={"1100px"} */}
                    {loadingSemestersNumbers ? (
                        <Spinner color='pink.500'/>
                    ) : errorSemestersNumbers ? (
                        <div>Error: {errorSemestersNumbers}</div>
                    ) : (
                        <VStack spacing={4} align="stretch" > 
                            {semestersNumbers.map((semesterNumber) => (    
                                <SemesterBlock key={semesterNumber} semesterNumber={semesterNumber} isActive={activeSemester === semesterNumber} onClick={() => handleSemesterClick(semesterNumber)}/>
                            ))}
                        </VStack>
                        )
                    }
                    <Box margin={"10px"}>
                        <Button 
                            colorScheme="pink" 
                            variant="outline" 
                            minH={"50px"} 
                            minW={"200px"} 
                            position={"absolute"} 
                            top={"110px"} 
                            right={"40px"} 
                            onClick={handleCreateNewSubject}
                        >
                            Utwórz nowy przedmiot
                        </Button>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
}

export default HomePage;
