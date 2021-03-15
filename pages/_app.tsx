import Navigation from '../components/Navigation';
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <Navigation />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
