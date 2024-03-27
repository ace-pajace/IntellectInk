import { Box, Button, Grid, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import SemesterBlock from '../components/SemesterBlock';
import { useState } from 'react';

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

    return (
        <Box>
            <HomeNavbar />
            {/* Rest of the page content */}
            <Box padding={"50px"}>
                <HStack spacing={4} align="stretch">
                    <VStack spacing={4} align="stretch" minW={"1100px"}>
                        <SemesterBlock semesterNumber={1}/>
                        <SemesterBlock semesterNumber={2}/>
                        <SemesterBlock semesterNumber={3}/>
                    </VStack>
                    <Button colorScheme="pink" variant="outline" minH={"50px"} minW={"200px"} position={"absolute"} top={"110px"} right={"40px"}>Utwórz nowy przedmiot</Button>
                </HStack>
            </Box>
        </Box>
    );
}

export default HomePage;
