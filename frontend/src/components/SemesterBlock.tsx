import React from 'react';
import { Card, HStack, Text } from '@chakra-ui/react';
import { Box, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import CoursesBlock from './CoursesBlock';
// import { useNavigate } from 'react-router-dom';

interface SemesterBlockProps {  
    semesterNumber: number;
    isActive: boolean;
    onClick: () => void;
}

const SemesterBlock: React.FC <SemesterBlockProps> = ({ semesterNumber, isActive, onClick}) => {
    // const navigate = useNavigate();
    const handleClick = () => {

        onClick();
        // if (isActive) navigate('/subjects');
        // else navigate(`/subjects/semesters/${semesterNumber}`);
    }
    return (
        <Box minW={"70vw"}>
            <Card bg='pink.500' color='white' p={2} mb={2} onClick={handleClick} maxW={"1100px"}>
                <HStack padding={"10px"}>    
                    <Text fontSize="2xl" fontWeight="bold">Semestr {semesterNumber}</Text> 
                    {isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </HStack>
            </Card>
            <Collapse in={isActive}>
                <CoursesBlock semesterNumber={semesterNumber}/>
            </Collapse>
        </Box>
    );
};

export default SemesterBlock;