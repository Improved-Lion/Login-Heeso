import { Flex, Text, Button } from "@chakra-ui/react";
import useUserStore from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';

function Home() {
  // zustand 에 저장된 정보 불러오기
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // 로그인 화면으로 이동하는 걸 지우고 보면 user information 이 사라지는 것을 확인할 수 있다.
    navigate('/');
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