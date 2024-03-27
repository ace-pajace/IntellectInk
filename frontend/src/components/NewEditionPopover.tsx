import React from 'react';
import {
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Stack,
    useDisclosure
  } from '@chakra-ui/react'
  import  FocusLock from "react-focus-lock";  

  const NewEditionPopover = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
  
    return (
      <>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
            <PopoverTrigger>
                <Button colorScheme='pink' variant={"outline"} alignSelf={"baseline"}>
                Nowa edycja
                </Button>
            </PopoverTrigger>
            <PopoverContent p={5}>
                <FocusLock returnFocus persistentFocus={false}>
                <PopoverArrow />
                <PopoverCloseButton />
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Edycja przedmiotu</FormLabel>
                        <Input ref={firstFieldRef} defaultValue="Czas" required/>
                    </FormControl>
                    <ButtonGroup display='flex' justifyContent='flex-end'>
                    <Button variant='outline' colorScheme='pink' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='pink'>
                        Save
                    </Button>
                    </ButtonGroup>
                </Stack>
                </FocusLock>
            </PopoverContent>
        </Popover>
      </>
    )
  }

export default NewEditionPopover;