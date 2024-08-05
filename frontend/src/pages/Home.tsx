import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function Home() {
  // zustand 에 저장된 정보 불러오기
  // const { user, logout } = useUserStore();
  const info = pb.collection('users').getOne()
  const user = pb.authStore
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = async () => {
    try {
      await pb.authStore.clear();
      navigate('/');
    } catch (error) {
      console.error("Logout failed : ",error)
    }
    
  }

  return(
    <Flex direction={"column"} justifyContent={'center'} alignItems={"center"} maxW='500px' gap={4}>
      <Text fontSize={"x-large"}>Welcome !</Text>
      <Text>User Information</Text>
      <Text>Your email : {user?.email ?? 'No'}</Text>
      <Text>Your name: {user?.name ?? 'No'}</Text>
      <Text w={500}>Your token: {user?.token ?? 'No'}</Text>
      <Button onClick={handleLogout}>Log out</Button>
    </Flex>
  )
}

export default Home;