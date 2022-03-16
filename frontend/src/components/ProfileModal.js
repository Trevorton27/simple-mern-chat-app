import { ViewIcon } from '@chakra-ui/icons';
import { getSender } from '../config/ChatLogic';
import { ChatState } from '../context/ChatProvider';
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
  IconButton,
  Text,
  Image,
  Tooltip
} from '@chakra-ui/react';

const ProfileModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, selectedChat } = ChatState();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <>
          <Text style={{ fontSize: '18px' }}>
            You are in a one on one chat with{' '}
            {getSender(user, selectedChat.users)}
          </Text>
          <Tooltip
            style={{ textAlign: 'center' }}
            label='Click for chat partner info.'
            hasArrow
            placement='bottom'
          >
            <IconButton
              d={{ base: 'flex' }}
              icon={<ViewIcon />}
              onClick={onOpen}
            />
          </Tooltip>
        </>
      )}
      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize='40px'
            fontFamily='Work sans'
            d='flex'
            justifyContent='center'
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              fontFamily='Work sans'
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
