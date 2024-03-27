import React from 'react';
import { Card, HStack, Text } from '@chakra-ui/react';
import { Box, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import SubjectBlock from './SubjectBlock';
import { useNavigate } from 'react-router-dom';

interface SemesterBlockProps {  
    semesterNumber: number;
}

const SemesterBlock: React.FC <SemesterBlockProps> = ({ semesterNumber}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        setIsOpen(!isOpen);
        if (isOpen) navigate('/subjects');
        else navigate(`/subjects/semesters/${semesterNumber}`);
    }
    return (
        <Box>
            <Card bg='pink.500' color='white' p={2} mb={2} onClick={handleClick} maxW={"1100px"}>
                <HStack padding={"10px"}>    
                    <Text fontSize="2xl" fontWeight="bold">Semestr {semesterNumber}</Text> 
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </HStack>
            </Card>
            <Collapse in={isOpen}>
                <SubjectBlock />
            </Collapse>
        </Box>
    );
};

export default SemesterBlock;