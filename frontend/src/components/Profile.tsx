import { Flex, Text, Button, Avatar, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, PopoverBody } from "@chakra-ui/react";

function ProfilePop ({ user, handleLogout }) {

  return(
    <Flex
      direction={"column"}
      justifyContent={'center'} alignItems={"center"} 
      maxW='500px'
      gap={4}
    >
      <Popover size='sm' isLazy closeOnBlur>
        <PopoverTrigger>
          <Avatar size='sm' name={user?.name ?? 'N/A'} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverBody>
            <Flex direction="column" alignItems='center' gap={2} p={3}>
              <Text>User Information</Text>
              <Text>Your email : {user?.email ?? 'N/A'}</Text>
              <Text>Your name: {user?.name ?? 'N/A'}</Text>
              <Button onClick={handleLogout} mt={4}>Log out</Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

export default ProfilePop;