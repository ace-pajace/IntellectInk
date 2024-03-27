"use client";

import { Box, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';
import HomeNavbar from "../components/HomeNavbar";
import TreeNode from '../components/TreeNode';

const Links = ["WDI 22/23", "ASD 22/23", "Matematyka Dyskretna 21/22"];


export default function SubjectPage() {
    return (
        <>
            <HomeNavbar children={Links} />
            <Box p={4}>
                {/* SubjectNavbar */}
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Breadcrumb 1</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Breadcrumb 2</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Box>
                        <Button colorScheme="pink" mr={2}>Udostępnij</Button>
                        <Button colorScheme="pink">Kopiuj strukturę</Button>
                    </Box>
                </Flex>
                {/* SubjectContent */}
                <Flex>
                    {/* FileExplorer */}
                    <Box w="30%" borderWidth={1} borderColor="gray.300" mr={4}>
                        <TreeNode label='Konspekty' type={'directory'}>
                            <TreeNode label="Konspekty lato" type={'directory'}>
                                <TreeNode label="konspekt_1.docx" type={'file'} />
                                <TreeNode label="konspekt_2.docx" type={'file'} />
                            </TreeNode>
                            <TreeNode label="rozpiska.txt" type={'file'} />
                        </TreeNode>
                        <TreeNode label={'Zadania'} type={'directory'}>
                            <TreeNode label="Zadanie1.pdf" type={'file'} />
                            <TreeNode label="Zadanie2.pdf" type={'file'} />
                            <TreeNode label="Zadanie3.pdf" type={'file'} />
                        </TreeNode>
                    </Box>
                    {/* FileEditor */}
                    <Box w="70%" borderWidth={1} borderColor="gray.300">
                        {/* <FileEditor> */}
                    </Box>
                </Flex>
            </Box>
        </>
    );
}