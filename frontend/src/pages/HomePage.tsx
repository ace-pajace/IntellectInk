import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import HomeNavbar from '../components/HomeNavbar';

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

    useEffect(() => {
        // Your code here
    }, []);

    return (
        <Box>
            <HomeNavbar children={[]} />
            {/* Rest of the page content */}
        </Box>
    );
}

export default HomePage;
