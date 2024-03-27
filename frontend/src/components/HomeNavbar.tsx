"use client";

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


interface Props {
    children: React.ReactNode
}
interface NavbarProps {
    children: string[];
}
interface NavItemProps {
    title: string;
    isActive: boolean;
    isStatic: boolean;
}

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}
            position={'relative'}
        >
            {children}
        </Box>
    )
}

const username = "Jan Kowalski";

const HomeNavbar: React.FC<NavbarProps> = ({ children }) => {
    const navigate = useNavigate();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [navItems, setNavItems] = useState(children.map((child, idx) => ({ title: child, isActive: idx === 0 })));

    const removeNavItem = (index: number) => {
        setNavItems((prevItems) => {
            const wasActive = prevItems[index].isActive;
            const newItems = prevItems.filter((_, idx) => idx !== index);

            if (wasActive) {
                if (index > 0) {
                    // Set the previous item as active
                    newItems[index - 1].isActive = true;
                } else if (newItems.length > 0) {
                    // Set the next item as active
                    newItems[0].isActive = true;
                }
            }

            return newItems;
        });    };

    const activateNavItem = (index: number) => {
        setNavItems(prevItems => prevItems.map((item, idx) => ({ title: item.title, isActive: idx === index })));
    };

    return (
        <Box
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            px={4}
        >
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                <IconButton
                    size={"md"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={"center"}>
                    <Box>
                        <Text as="b">IntellectInk</Text>
                    </Box>
                    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                        <NavItem
                            title={"Przedmioty"}
                            isActive={false}
                            isStatic={true}
                            onRemove={() => null}
                            onClick={() => navigate('/subjects')}
                        />
                        {/* Tabs */}
                        {navItems.map((item, idx) => (
                            <NavItem
                                title={item.title}
                                isActive={item.isActive}
                                isStatic={false}
                                onRemove={() => removeNavItem(idx)}
                                onClick={() => activateNavItem(idx)}
                            />
                        ))}
                    </HStack>
                </HStack>
                {/* Avatar Button */}
                <Flex alignItems={"center"}>
                    <Menu>
                        <Text me={4}>Witaj, {username}!</Text>
                        <MenuButton
                            as={Button}
                            rounded={"full"}
                            variant={"link"}
                            cursor={"pointer"}
                            minW={0}
                        >
                            <Avatar size={"sm"} bg={"gray.500"} />
                        </MenuButton>
                        <MenuList>
                            {/* Avatar Button <MenuItem>s*/}
                            <MenuItem>Konto</MenuItem>
                            <MenuDivider />
                            <MenuItem color={"red"}>Wyloguj się</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        {/* Tabs hamburger */}
                        {children.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

const CloseButton: React.FC<{ onRemove: () => void }> = ({ onRemove }) => {
    const [iconColor, setIconColor] = useState("blue");

    return (
        <CloseIcon
            _hover={{
                textDecoration: "none",
                bg: useColorModeValue("grey.100", "grey.700"),
            }}
            boxSize=".5em"
            position="absolute"
            top={2}
            right={2}
            color={iconColor}
            onMouseEnter={() => setIconColor("red")}
            onMouseLeave={() => setIconColor("blue")}
            onClick={onRemove}
        />
    );
};

const NavItem: React.FC<NavItemProps & { onRemove: () => void, onClick: () => void }> = ({ title, isActive, isStatic, onRemove, onClick }) => {
    const borderBottomColor = useColorModeValue("white", "white");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const hoverBg = useColorModeValue("blue.50", "blue.600");
    const textColor = isActive ? "blue.500" : "black";

    const borderProperties = isActive ? {
        borderBottom: "3px solid",
        borderBottomColor: borderBottomColor,
        borderLeft: "1px solid",
        borderLeftColor: borderColor,
        borderRight: "1px solid",
        borderRightColor: borderColor,
        borderTop: "1px solid",
        borderTopColor: borderColor,
        borderTopRadius: "lg",
    } : {};

    return (
        <Box
            as="a"
            onClick={onClick}
            _hover={!isActive ? {
                textDecoration: "none",
                bg: hoverBg,
            } : {}}
            href={"#"}
            px={5}
            py={5}
            mx={2}
            position="relative"
            {...borderProperties}
        >
            <Text color={textColor}>{title}</Text>
            {isActive && !isStatic ? <CloseButton onRemove={onRemove} /> : null}
        </Box>
    );
};

export default HomeNavbar;