import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, Text } from '@chakra-ui/layout';
import { IconButton, Spinner, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModal from './ProfileModal';
import { getSender, getSenderInfo } from '../config/ChatLogic';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const Chat = () => {
  const { fetchAgain, setFetchAgain, user, selectedChat, setSelectedChat } =
    ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w='100%'
            fontFamily='Work sans'
            d='flex'
            justifyContent={{ base: 'space-between' }}
            alignItems='center'
          >
            {' '}
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderInfo(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    //fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
        </>
      ) : (
        <Box d='flex' alignItems='center' justifyContent='center' h='100%'>
          <Text fontSize='3xl' pb={3} fontFamily='Work sans'>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default Chat;
