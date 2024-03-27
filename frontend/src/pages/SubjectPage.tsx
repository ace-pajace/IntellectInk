"use client";

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import HomeNavbar from "../components/HomeNavbar";
import TreeNode from '../components/TreeNode';
import { useState } from 'react';

const Links = ["WDI 22/23", "ASD 22/23", "Matematyka Dyskretna 21/22"];


export default function SubjectPage() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <>
            <HomeNavbar children={Links} />
            {/* we need to change this */}
            <Flex p={4} direction="column" minHeight={"80vh"}>
                {/* SubjectNavbar */}
                <Flex justifyContent="flex-end" alignItems="center">
                    <Box>
                        <Button colorScheme="pink" variant='outline' mr={2}>Utwórz folder</Button>
                        <Button colorScheme="pink" variant='outline' mr={2}>Dodaj plik</Button>
                        <Button colorScheme="pink" mr={2}>Udostępnij</Button>
                        <Button colorScheme="pink">Kopiuj strukturę</Button>
                    </Box>
                </Flex>
                {/* SubjectContent */}
                <Flex>
                    {/* FileExplorer */}
                    <Box w="30%" mr={4}>
                        <Text ms={2} color={"gray.500"}>File explorer</Text>
                        <Box borderWidth={1} borderColor="gray.300" overflow="auto" py={3} h={"80vh"}>
                            <TreeNode label='Konspekty' type={'directory'} setActiveNode={setActiveNode}>
                                <TreeNode label="Konspekty lato" type={'directory'} setActiveNode={setActiveNode}>
                                    <TreeNode label="konspekt_1.docx" type={'file'} setActiveNode={setActiveNode} />
                                    <TreeNode label="konspekt_2.docx" type={'file'} setActiveNode={setActiveNode} />
                                </TreeNode>
                                <TreeNode label="rozpiska.txt" type={'file'} setActiveNode={setActiveNode} />
                            </TreeNode>
                            <TreeNode label={'Zadania'} type={'directory'} setActiveNode={setActiveNode}>
                                <TreeNode label="Zadanie1.pdf" type={'file'} setActiveNode={setActiveNode} />
                                <TreeNode label="Zadanie2.pdf" type={'file'} setActiveNode={setActiveNode} />
                                <TreeNode label="Zadanie3.pdf" type={'file'} setActiveNode={setActiveNode} />
                            </TreeNode>
                        </Box>
                    </Box>
                    {/* FileEditor */}
                    <Box w="70%">
                        <Text ms={2} color={"gray.500"}>File editor</Text>
                        <Box borderWidth={1} borderColor="gray.300" overflow="auto" py={3} h={"80vh"}>
                            {activeNode && <Box>{activeNode}</Box>}
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}