"use client";

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import HomeNavbar from "../components/HomeNavbar";
import TreeNode from '../components/TreeNode';
import { useState } from 'react';


interface Node {
    id: string;
    label: string;
    type: 'directory' | 'file';
    children?: Node[];
}

// do mockupowania
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';

const initialNodes: Node[] = [
    {
        id: uuidv4(),
        label: 'Konspekty',
        type: 'directory',
        children: [
            {
                id: uuidv4(),
                label: 'Konspekty grupa 1',
                type: 'directory',
                children: [
                    {
                        id: uuidv4(),
                        label: 'konspekt_1.docx',
                        type: 'file',
                    },
                    {
                        id: uuidv4(),
                        label: 'konspekt_2.docx',
                        type: 'file',
                    },
                ],
            },
            {
                id: uuidv4(),
                label: 'rozpiska.txt',
                type: 'file',
            },
        ],
    },
    {
        id: uuidv4(),
        label: 'Zadania',
        type: 'directory',
        children: [
            {
                id: uuidv4(),
                label: 'Zadanie1.pdf',
                type: 'file',
            },
            {
                id: uuidv4(),
                label: 'Zadanie2.pdf',
                type: 'file',
            },
            {
                id: uuidv4(),
                label: 'Zadanie3.pdf',
                type: 'file',
            },
        ],
    },
];

export default function CoursePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [activeNode, setActiveNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>(initialNodes);

    // podziel na dwie metody: 
    // - addDirectoryNode (zapisanie do bazy -> dodanie do drzewa) 
    // - addFileNode (upload -> nowy widok -> pobranie pliku -> zapisanie do bazy -> dodanie do drzewa) 
    const addNode = (type: 'directory' | 'file') => {
        const findNodeAndParent = (nodes: Node[] | undefined, label: string): [Node | null, Node[] | null] => {
            if (!nodes) {
                throw new Error('Nodes is undefined');
            }
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].label === label) {
                    return [nodes[i], nodes];
                } else if (nodes[i].children) {
                    const [foundNode, parentNode] = nodes[i].children ? findNodeAndParent(nodes[i].children, label) : [null, null];
                    if (foundNode) {
                        return [foundNode, parentNode];
                    }
                }
            }
            return [null, null];
        };
    
        if (activeNode) {
            const [currentNode, parentNode] = findNodeAndParent(nodes, activeNode.label);
        
            const newNode: Node = {
                id: uuidv4(),
                label: 'test',
                type: type,
                children: type === 'directory' ? [] : undefined,
            };
            if (activeNode.type === 'file') {
                // sprawdz czy parent to TreeNode czy nie Box/Flex
                if (parentNode) {
                    parentNode.push(newNode);
                    setNodes([...nodes]);
                }
            }
            if (activeNode.type === 'directory') {
                if (currentNode && currentNode.children) {
                    currentNode.children.push(newNode);
                    setNodes([...nodes]);
                }
            }
        }
    };
    
    

    return (
        <>
            <HomeNavbar />
            {/* we need to change this minHeight*/}
            <Flex p={4} direction="column" minHeight={"80vh"}>
                {/* CourseNavbar */}
                <Flex justifyContent="flex-end" alignItems="center">
                    <Box>
                        <Button colorScheme="pink" variant='outline' mr={2} onClick={() => addNode('directory')}>Utwórz folder</Button>
                        <Button colorScheme="pink" variant='outline' mr={2} onClick={() => addNode('file')}>Dodaj plik</Button>
                        <Button colorScheme="pink" mr={2} onClick={() => navigate(`${currentPath}/123/share`)}>Udostępnij</Button>
                        <Button colorScheme="pink">Kopiuj strukturę</Button>
                    </Box>
                </Flex>
                {/* CourseContent */}
                <Flex>
                    {/* FileExplorer */}
                    <Box w="30%" mr={4}>
                        <Text ms={2} color={"gray.500"}>Eksplorator plików</Text>
                        <Box 
                            borderWidth={1} 
                            // bgColor={"pink.50"} 
                            borderColor="gray.300" 
                            overflow="auto" 
                            py={3} 
                            h={"80vh"} 
                            rounded={"lg"}
                        >
                            {nodes.map(node => (
                                <TreeNode key={node.id} node={node} setActiveNode={setActiveNode} />
                            ))}
                        </Box>
                    </Box>
                    {/* FileEditor */}
                    <Box w="70%">
                        <Text ms={2} color={"gray.500"}>Widok/Edytor</Text>
                        <Box borderWidth={1} borderColor="gray.300" overflow="auto" p={3} h={"80vh"} rounded={"lg"}>
                            {activeNode && <Box>{activeNode.label}</Box>}
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}
