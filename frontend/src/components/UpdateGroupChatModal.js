import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Tooltip
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import UserBadge from './UserBadge';
import UserListItem from './UserListItem';

const UpdateGroupChatModal = ({ fetchMessages }) => {
  const { selectedChat, setSelectedChat, user, fetchAgain, setFetchAgain } =
    ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (query) => {};

  const handleRename = async () => {};

  const handleAddUser = async (user1) => {};

  const handleRemove = async (user1) => {};

  return (
    <>
      {' '}
      <Tooltip label='Chat Details And Options.' hasArrow placement='bottom'>
        <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
      </Tooltip>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            d='flex'
            justifyContent='center'
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d='flex' flexDir='column' alignItems='center'>
            <Box w='100%' d='flex' flexWrap='wrap' pb={3}>
              {selectedChat.users.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl d='flex'>
              <Input
                placeholder='Chat Name'
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant='solid'
                colorScheme='teal'
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add User to group'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size='lg' />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme='red'>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
