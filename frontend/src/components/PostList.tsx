import PocketBase from 'pocketbase';
import Post from '@/components/Post';
import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const pb = new PocketBase('http://127.0.0.1:8090');

interface PostData {
  author: string;
  collectionId: string;
  collectionName: string;
  content: string;
  created: string;
  dateTime: string;
  file: string;
  id: string;
  title: string;
  updated: string;
}

function PostList() {

  const [ data, setData ] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pb.collection('posts').getList(1, 50, {
          expand: 'author',
          fields: 'id, title, content, author.name, dateTime'
        });
        console.log(response.items);
        setData(response.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    });
    return formatter.format(date).replace(/\//g, '.');
  }

  return(
    <Flex
      w='100%'
      direction={'column'} gap={4}
    >
      {data.map(post => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          authorName={post.author.name}
          authorId={post.author}
          dateTime={formatDateTime(post.dateTime)}
        />
      ))}
      <Text alignSelf={'flex-end'}>
        전체 게시글 수 : {data.length}
      </Text>
    </Flex>
  )
}

export default PostList;