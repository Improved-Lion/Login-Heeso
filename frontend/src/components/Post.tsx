import { Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

function Post ({ id, title, dateTime, authorId, authorName }) {
  const navigate = useNavigate();
  const toast = useToast();
  
  const handleClick = () => {
    navigate(`/post/detail/${id}`)
  };

  const handleDeleteClick = async () => {
    try {
      await pb.collection('posts').delete(id);
      navigate(`/post/detail/${id}`)
      toast({
        title: '게시글이 삭제되었습니다.',
        duration: 5000,
        isClosable: true,
        status: 'error'
      })
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <Flex
      w={'100%'}
      justifyContent={"space-between"} gap={5}
      _hover={{ color: 'blue', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Text>{title}</Text>
      <Text>{authorId}</Text>
      <Text>{authorName}</Text>
      <Text>{dateTime}</Text>
      <Button onClick={handleDeleteClick}>삭제</Button>
    </Flex>
  )
}

export default Post;