import Profile from '@/components/Profile';
import { Flex, Text } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from "@/store/useUserStore";
import PocketBase from 'pocketbase';
import { useState } from 'react';

const pb = new PocketBase('http://127.0.0.1:8090');

function Header() {
  const [ title, setTitle ] = useState('Welcome!');
  const location = useLocation();
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  if ( location.pathname === '/') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await pb.authStore.clear();
      logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed : ",error)
    }
  };

  return(
    <Flex gap={20}>
      <Text fontSize={"x-large"}>{title}</Text>
      <Profile user={user} handleLogout={handleLogout}/>
    </Flex>
  )
}

export default Header;