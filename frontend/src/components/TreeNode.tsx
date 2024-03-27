import { Box, VStack, Collapse, Button, HStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from 'react';

interface Node {
  id: string;
  label: string;
  type: 'directory' | 'file';
  children?: Node[];
}

interface TreeNodeProps {
  node: Node;
  setActiveNode?: (node: Node | null) => void;
  isActive?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, setActiveNode, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setActiveNode && setActiveNode(node)
  };

  const Icon = node.type === 'directory' ? FolderIcon : InsertDriveFileIcon;

  return (
    <VStack
      align="start"
      spacing={1}
      backgroundColor={isActive ? 'gray.200' : undefined}
    >
      <HStack width="100%" position={"relative"}>
        <Button
          variant="ghost"
          onClick={handleToggle}
          leftIcon={node.type === 'file' ? undefined : isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        >
          <Box me={2}>
            {node.type === 'directory' && isOpen ? <FolderOpenIcon /> : <Icon />}
          </Box>
          {node.label}
        </Button>
        {/* {node.type === 'directory' && (
          <Button variant="ghost" onClick={() => addNode('file')} rightIcon={<AddIcon />} position={"absolute"} right={2} />
        )} */}
      </HStack>
      <Collapse in={isOpen && node.type === "directory"}>
        <Box pl={5} width="100%">
          {node.children?.map((childNode, index) => (
            <TreeNode key={index} node={childNode} setActiveNode={setActiveNode}/>
          ))}
        </Box>
      </Collapse>
    </VStack>
  );
};

export default TreeNode;
