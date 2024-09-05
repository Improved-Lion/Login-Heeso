import { Flex, Text, Textarea, Button, useToast, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


function Create() {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const { user } = useUserStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTime = new Date();
      await pb.collection('posts').create({
        "title" : title,
        "content" : content,
        "dateTime" : dateTime,
        "author" : user?.token,
      });
      setTitle('');
      setContent('');
      toast({
        title: '게시글이 등록되었습니다',
        duration: 5000,
        isClosable: true,
        status: 'success'
      })
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast({
        title: '게시글 등록에 실패하였습니다.',
        duration: 5000,
        isClosable: true,
        status: 'error'
      })
    }
  }

  return(
    <>
    <Text>새로운 글 쓰기</Text>
    <Flex
      as='form' onSubmit={handleSubmit}
      direction={"column"} alignItems={'center'} gap={2}
    >
      <FormControl isRequired>
        <FormLabel htmlFor="title">제목</FormLabel>
        <Input
          minW={500}
          id="title"
          placeholder="게시글 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel htmlFor="content">내용</FormLabel>
        <Textarea
          id="content"
          placeholder="게시글 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <Button mt={4} type="submit">
        게시글 작성
      </Button>
    </Flex>
    </>
  );
}

export default Create;