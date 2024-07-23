import { Flex, Text, Image } from "@chakra-ui/react";

function Home() {
  return(
    <Flex justifyContent={'center'} alignItems={"center"}>
      <Text fontSize={"x-large"}>
        Welcome to Heeso World !
      </Text>
      <Image src="/heeso.jpg"></Image>
    </Flex>
  )
}

export default Home;