import { Box, Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import SemesterBlock from '../components/SemesterBlock';
import { useState } from 'react';
import { useEffect } from 'react';
import ApiService from '../ApiService';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    // Do renderowania odpowiedniego widoku w zależności od ścieżki URL
    // const { semester_number, subject_name, subject_year } = useParams();

    // if (subject_year) {
    //     // Renderuj widok dla /subjects/semesters/:semester_number/:subject_name/:subject_year
    // } else if (subject_name) {
    //     // Renderuj widok dla /subjects/semesters/:semester_number/:subject_name
    // } else if (semester_number) {
    //     // Renderuj widok dla /subjects/semesters/:semester_number
    // } else {
    //     // Renderuj widok dla /subjects
    // }
    // const [userCourses, setUserCourses] = useState<any[]>([]);
    const apiService = new ApiService();
    const [userCourses, setUserCourses] = useState<number[]>([]);

    useEffect(() => {
        // Wywołaj getUserCourses po pierwszym renderowaniu
        apiService.getUserCourses()
            .then(uniqueTermNumbers => {
                setUserCourses(uniqueTermNumbers);
            })
            .catch(error => console.error(error));
    });

    const [activeSemester, setActiveSemester] = useState<number | null>(null);
    const navigate = useNavigate();

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
                    <VStack spacing={4} align="stretch" > 
                    {userCourses.map((semesterNumber) => (    
                        <SemesterBlock key={semesterNumber.toString()} semesterNumber={semesterNumber} isActive={activeSemester === semesterNumber} onClick={() => handleSemesterClick(semesterNumber)}/>
                    ))}
                        {/* <SemesterBlock semesterNumber={1} isActive={activeSemester === 1} onClick={() => handleSemesterClick(1)}/>
                        <SemesterBlock semesterNumber={2} isActive={activeSemester === 2} onClick={() => handleSemesterClick(2)}/>
                        <SemesterBlock semesterNumber={3} isActive={activeSemester === 3} onClick={() => handleSemesterClick(3)}/> */}
                    </VStack>
                    <Box margin={"10px"}>
                        <Button colorScheme="pink" variant="outline" minH={"50px"} minW={"200px"} position={"absolute"} top={"110px"} right={"40px"} onClick={handleCreateNewSubject}>Utwórz nowy przedmiot</Button>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
}

export default HomePage;
