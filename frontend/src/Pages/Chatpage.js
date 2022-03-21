import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import ChatList from '../components/ChatList';
import ChatContainer from '../components/ChatContainer';
import Header from '../components/Header';

const Chatpage = () => {
  const { user } = ChatState();
  console.log('user: ', user);

  return (
    <div style={{ width: '100%', backgroundColor: '#000' }}>
      {user && <Header />}
      <Box d='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <ChatContainer />}
        {user && <ChatList />}
      </Box>
    </div>
  );
};

export default Chatpage;
