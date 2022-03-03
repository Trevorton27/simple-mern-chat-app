import { Avatar, Box, Button, Text, Tooltip } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/menu';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';

const Slider = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = ChatState();
  return (
    <>
      <Box
        d='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Text fontSize='2xl' fontFamily='Work sans'>
          Welcome {user.name}
        </Text>

        <div>
          <Tooltip
            label='Search users to chat with'
            hasArrow
            placement='bottom-end'
          >
            <Button variant='ghost'>
              <i className='fas fa-search'></i>
              <Text d={{ base: 'none', md: 'flex' }} px={4}>
                Search Users
              </Text>
            </Button>
          </Tooltip>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg='white' rightIcon={<ChevronDownIcon />}>
              <Avatar
                size='sm'
                cursor='pointer'
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default Slider;
