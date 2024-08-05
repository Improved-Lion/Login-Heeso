import { Button, Flex, FormControl, FormLabel, Input, Text, useToast, VStack, InputRightElement, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import PocketBase from 'pocketbase';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useUserStore from '@/store/useUserStore';

const pb = new PocketBase('http://127.0.0.1:8090');

function SignIn() {
  // 입력 창 상태
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const [ show, setShow ] = useState<boolean>(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useUserStore();

  // 입력할 때마다 유효성 검사 - 실패시 에러메세지 띄우기
  // 불필요한 사용자 경험, 형식 검사 필요하지 않음, 보안 이슈로 제거

  // 클릭 시 해야할 일

  // 아이디 비밀번호 서버로 보내기
  // 결과값
  // 1. 로그인 성공 : 다음 페이지로 이동, zustand 에 유저 정보 저장
  // 2. 로그인 실패 - 비밀번호 틀림 : 에러메세지 출력
  // 3. 로그인 실패 - 존재하지 않는 회원 : 에러메세지 출력

  const handleSubmit = async ( e: React.FormEvent ) => {

    e.preventDefault();

    try {
      const authData = await pb.collection('users').authWithPassword( email, password );
      console.log('로그인 성공', authData);
      setUser({
        token: authData.token,
        email: email,
        name: authData.record.name,
      })
      toast({
        title: 'Login Completed',
        description: "Welcome here!",
        duration: 5000,
        isClosable: true,
        status: 'success'
      })
      navigate('/home');
    } catch (error) {
      console.log('로그인 실패', error);
      toast({
        title: 'Login Failed',
        description: "Make sure you joined us and please check your password!",
        duration: 5000,
        isClosable: true,
        status: 'error'
      })
      console.log(email, password);
    }
  };

  const isPwVisible = () => setShow(!show);

  return(
    <Flex
      w={400}
      as='form' onSubmit={handleSubmit}
      direction={'column'} alignItems={'center'} gap={10}
    >
      <Text fontSize={'x-large'}>LOGIN</Text>
        <FormControl id='email'>
          <VStack spacing={5}>

            <FormLabel htmlFor='email' srOnly>이메일</FormLabel>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
            />

            <FormLabel htmlFor='password' srOnly>비밀번호</FormLabel>
            <InputGroup>
              <Input
                id='password'
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <InputRightElement w='3rem'>
                <Button onClick={isPwVisible} borderTopLeftRadius={0} borderBottomLeftRadius={0}>
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            
          </VStack>
        </FormControl>

      <Button colorScheme='blue' type='submit' w='100%'>로그인</Button>

      <ChakraLink as={ReactRouterLink} to='/signup' color='blue' alignSelf={'flex-end'}>
        Join us!
      </ChakraLink>
    </Flex>
    
  )
}

export default SignIn;