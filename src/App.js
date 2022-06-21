import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from './routes';
import { Loader } from './componets';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Theme } from './Theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={Theme}>
        <Suspense fallback={<Loader />}>
            <AppRouter />
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
