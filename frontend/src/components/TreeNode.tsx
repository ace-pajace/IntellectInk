import { Box, VStack, Collapse, Button, HStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from 'react';

interface TreeNodeProps {
  label: string;
  type: 'directory' | 'file';
  children?: React.ReactNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, type, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodes, setNodes] = useState<TreeNodeProps[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addNode = () => {
    setNodes([...nodes, { label: 'test', type: 'file' }]);
  };

  const Icon = type === 'directory' ? FolderIcon : InsertDriveFileIcon;

  return (
    <VStack align="start" spacing={1}>
      <HStack width="100%" position={"relative"}>
        <Button 
          variant="ghost" 
          onClick={handleToggle} 
          leftIcon={type === 'file' ? undefined : isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        >
          <Box me={2}>
            {type === 'directory' && isOpen ? <FolderOpenIcon/> : <Icon/>}
          </Box>
          {label}
        </Button>
        {type === 'directory' && (
          <Button variant="ghost" onClick={addNode} rightIcon={<AddIcon />} position={"absolute"} right={2}/>
        )}
      </HStack>
      <Collapse in={isOpen}>
        <Box pl={5} width="100%">
          {children}
          {nodes.map((node, index) => (
            <TreeNode key={index} label={node.label} type={node.type} />
          ))}
        </Box>
      </Collapse>
    </VStack>
  );
};

export default TreeNode;

// import { Box, VStack, Collapse, Button } from '@chakra-ui/react';
// import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { useState } from 'react';

// interface TreeNodeProps {
//   label: string;
//   children?: React.ReactNode;
// }

// const TreeNode: React.FC<TreeNodeProps> = ({ label, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <VStack align="start" spacing={1}>
//       <Button variant="ghost" onClick={handleToggle} leftIcon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}>
//         {label}
//       </Button>
//       <Collapse in={isOpen}>
//         <Box pl={5}>{children}</Box>
//       </Collapse>
//     </VStack>
//   );
// };

// export default TreeNode;