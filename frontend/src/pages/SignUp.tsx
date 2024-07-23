import { Flex, Text, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";

function SignUp() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ nickname, setNickname ] = useState<string>('');
  const [ errorMessage, setErrorMessage ] = useState<string>('');


  // 입력할 때마다 유효성 검사 - 이메일 형식, 비밀번호, 비밀번호 = 컨펌비밀번호 일치, 닉네임 2-6자
  // 위의 유효성 검사 통과 시에만 제출 버튼 활성화
  const emailValidation = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex ? true : false
  };

  
  const passwordConfirmCheck = () => {
    return password === confirmPassword ? true : false
  };

  // 클릭 시 해야할 일
  // 이메일 중복체크 : 에러메세지 출력
  // 닉네임 중복체크 : 에러메세지 출력
  const handleSubmit = () => {

    passwordConfirmCheck
    console.log(email, password, confirmPassword, nickname);

  };

  return(
    <Flex
      w={400}
      as='form' onSubmit={handleSubmit}
      direction={'column'} alignItems={'center'} gap={3}
    >
      <Text fontSize={'x-large'}>REGISTER</Text>

      <VStack spacing={6} w='100%'>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            id="email" type="email"
            placeholder="example12@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            id="password" type="password" placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            id="confirmPassword" type="password" placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Nickname</FormLabel>
          <Input
            id="nickname" type="name" placeholder="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Hello</FormLabel>
          <Input
            id="nickname" type="name" placeholder="nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormControl>

      </VStack>
      

      <Button onClick={handleSubmit}>Register</Button>

      <Flex gap={3}>
        <Text cursor='default'>Already have an account?</Text>
        <Text as='a' color="blue" cursor="pointer">Log in</Text>
      </Flex>
      
    </Flex>
  )
}

export default SignUp;