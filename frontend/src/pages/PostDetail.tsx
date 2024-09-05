import { Text, Flex, Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

interface Post {
  id: string;
  title: string;
  dateTime: string;
  file: string;
  content: string;
}

function PostDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [ selectedPost, setSelectedPost ] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error('No ID provided');
      }
      try {
        const post = await pb.collection('posts').getOne(id) as Post;
        console.log(post);
        setSelectedPost(post);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleClick = () => {
    navigate('/home');
  }

  if (!selectedPost) {
    return <Text>Loading...</Text>
  }

  return(
    <Flex direction={'column'} gap={4}>
      <Text>{selectedPost.title}</Text>
      <Flex>
        <Text>{selectedPost.dateTime}</Text>
      </Flex>
      <Image src={`${selectedPost.file}`} />
      <Text>{selectedPost.content}</Text>
      <Button onClick={handleClick}>전체 게시글 보기</Button>
    </Flex>
  )
}

export default PostDetail;