import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './../theme';
import router from './routes';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <RouterProvider router = {router}></RouterProvider>
      </div>
    </ChakraProvider>
  );
};

export default App;
