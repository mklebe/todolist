import dynamic from 'next/dynamic';

import { Box, Heading, Container } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react";
const BookAdd = dynamic(() => import("../components/BookAdd"), {ssr: false});
const BookList = dynamic(() => import("../components/BookList"), {ssr: false});
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <ChakraProvider>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <Navigation />
        <Container maxWidth="100%" mb="32px">
          <Heading>Add to your library</Heading>
          <BookAdd />
        </Container>
        <Container maxWidth="100%" mb="32px">
          <BookList />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
