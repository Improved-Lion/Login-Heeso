import { FC, ReactElement } from 'react';
import { Outlet } from "react-router-dom";
import Header from '@/components/Header';

const RootLayout: FC = (): ReactElement => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;