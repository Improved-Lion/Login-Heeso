import { FC, ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import { Flex } from '@chakra-ui/react';
import Header from '@/components/Header';

const RootLayout: FC = (): ReactElement => {

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'} alignItems={'center'}
      p={20}
      gap={5}
    >
      <Header />
      <Outlet />
    </Flex>
  );
};

export default RootLayout;