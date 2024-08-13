import { Flex, Text } from "@chakra-ui/react";

function Post ({ title, dateTime, authorId, authorName }) {

  return(
    <Flex
      w={'100%'}
      justifyContent={"space-between"} gap={5}
      _hover={{ color: 'blue', cursor: 'pointer' }}
    >
      <Text>{title}</Text>
      <Text>{authorId}</Text>
      <Text>{authorName}</Text>
      <Text>{dateTime}</Text>
    </Flex>
  )
}

export default Post;