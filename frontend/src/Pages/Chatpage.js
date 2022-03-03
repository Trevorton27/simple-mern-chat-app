import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import Slider from '../components/Slider';

const Chatpage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: '100%' }}>
      {user && <Slider />}
      <Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <Chat />}
        {user && <ChatList />}
      </Box>
    </div>
  );
};

export default Chatpage;
