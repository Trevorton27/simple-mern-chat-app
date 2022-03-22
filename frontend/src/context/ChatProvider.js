import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (!user) history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  console.log('user: ', user);
  return (
    <ChatContext.Provider
      value={{
        fetchAgain,
        setFetchAgain,
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
        notifications,
        setNotifications
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
