import { Box } from '@chakra-ui/layout';
import './style.css';
import Chat from './Chat';
import { ChatState } from '../context/ChatProvider';

const ChatContainer = () => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDir='column'
      p={3}
      bg='white'
      w={{ base: '100%', md: '68%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Chat />
    </Box>
  );
};

export default ChatContainer;
