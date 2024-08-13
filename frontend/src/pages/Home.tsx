import { Flex } from '@chakra-ui/react';
import PostList from '@/components/PostList';
import { Button } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function Home() {


  return(
    <Flex direction={'column'} gap={5}>
      <PostList />
      <ChakraLink as={ReactRouterLink} to='/create'>
        <Button w='100%'>
          글 쓰기
        </Button>
      </ChakraLink>
      
    </Flex>
  )
}

export default Home;