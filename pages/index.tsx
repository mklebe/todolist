import { Box, Heading, Container } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <ChakraProvider>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <Navigation />
        <Heading>Hello World</Heading>
      </Box>
    </ChakraProvider>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
