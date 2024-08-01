import { Flex, Text, FormControl, FormLabel, Input, Button, VStack, useToast, FormErrorMessage, useAnimationState } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function SignUp() {
  //  입력 상태
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ nickname, setNickname ] = useState<string>('');

  // // 형식 검사 상태
  // const [ emailError, setEmailError ] = useState<boolean>(false);
  // const [ passwordError, setPasswordError ] = useState<boolean>(false);
  // const [ passwordConfirmError, setPasswordConfirmError ] = useState<boolean>(false);
  // const [ nicknameError, setNicknameError ] = useState<boolean>(false);

  const [ errors, setErrors ] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nickname: false,
  })

  // 회원가입 실패 시 에러 메세지 상태
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  const navigate = useNavigate();
  const toast = useToast();

  // 입력할 때마다 유효성 검사 - 이메일 형식, 비밀번호, 비밀번호 = 컨펌비밀번호 일치, 닉네임 2-6자
  // 위의 유효성 검사 통과 시에만 제출 버튼 활성화 ( 아직 )

  // 형식 검사
  const emailValidation = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email);
  const passwordValidation = (password :string) => /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/.test(password);
  const passwordConfirmCheck = (confirmPassword :string) => password === confirmPassword;
  const nicknameValidation = (nickname: string) => /^.{2,6}$/.test(nickname);

  useEffect(() => {
    setErrors({
        email: email ? !emailValidation(email) : false,
        password : password ? !passwordValidation(password) : false,
        confirmPassword: confirmPassword ? !passwordConfirmCheck(confirmPassword) : false,
        nickname: nickname ? !nicknameValidation(nickname) : false,
      });
    }, [email, password, confirmPassword, nickname]);

  // 클릭 시 해야할 일
  // 이메일 중복체크 : 에러메세지 출력
  // 닉네임 중복체크 : 에러메세지 출력

  const emailCheck = async (email : string) => {
    try {
      const records = await pb.collection('users').getFullList();
      const emailList = records.map( user => user.email );
      return emailList.includes(email);
    } catch (error) {
      console.error('email error', error);
      return false;
    }
  };

  const nicknameCheck = async (nickname : string) => {
    try {
      const records = await pb.collection('users').getFullList();
      const nicknameList = records.map( user => user.name );
      return nicknameList.includes(nickname);
    } catch (error) {
      console.error('nickname error', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (Object.values(errors).some(error => error)) {
      setErrorMessage('Please check you passed all validation.');
      return;
    }

    const isEmailTaken = await emailCheck(email);
    const isNickNameTaken = await nicknameCheck(nickname);

    if( isEmailTaken && isNickNameTaken ) {
      setErrorMessage('This email is already in use and this nickname is already taken. Please try another.');
    } else if ( isEmailTaken ) {
      setErrorMessage('This email is already in use. Please try another.');
    } else if ( isNickNameTaken ) {
      setErrorMessage('This nickname is already taken. Please choose another.');
    }

    try {
      const newUser = await pb.collection('users').create({
        name: nickname,
        email: email,
        password: password,
        passwordConfirm: confirmPassword
      });
      console.log('New User', newUser);
      toast({
        title: 'Welcome!',
        description: "We're happy to have you! Please log in",
        duration: 5000,
        isClosable: true,
        status: 'success'
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Register Failed',
        description: errorMessage,
        duration: 5000,
        isClosable: true,
        status: 'error'
      });
    }
  };

  return(
    <Flex
      w={400}
      as='form' onSubmit={handleSubmit}
      direction={'column'} alignItems={'center'} gap={3}
    >
      <Text fontSize={'x-large'}>REGISTER</Text>

      <VStack spacing={6} w='100%'>
        {/* isInvalid : 에러 상태인지 여부 결정,  */}
        <FormControl isInvalid={errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            id="email" type="email"
            placeholder="example12@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email &&
          <FormErrorMessage>
            Please enter a valid email address.
          </FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            id="password" type="password" placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password &&
          <FormErrorMessage>
            Password must be between 8 and 15 characters long and include both letters and numbers.
          </FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            id="confirmPassword" type="password" placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword &&
          <FormErrorMessage>
            Passwords do not match. Please try again.
          </FormErrorMessage>
          }
        </FormControl>

        <FormControl isInvalid={errors.nickname} isRequired>
          <FormLabel>Nickname</FormLabel>
          <Input
            id="nickname" type="name" placeholder="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          {errors.nickname &&
          <FormErrorMessage>
            Nickname must be between 2 and 6 characters long.
          </FormErrorMessage>
          }
        </FormControl>

      </VStack>
      
      <Button type="submit">Register</Button>

      <Flex gap={3}>
        <Text cursor='default'>Already have an account?</Text>
        <ChakraLink as={ReactRouterLink} to='/' color='blue' alignSelf={'flex-end'}>
        Log in!
        </ChakraLink>
      </Flex>

      
    </Flex>
  )
}

export default SignUp;