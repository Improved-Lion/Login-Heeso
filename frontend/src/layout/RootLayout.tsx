import { FC, ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import { Flex } from '@chakra-ui/react';

const RootLayout: FC = (): ReactElement => {
  return (
    <Flex justifyContent={'center'} p={20}>
      <main>
        <Outlet />
      </main>
    </Flex>
  );
};

export default RootLayout;