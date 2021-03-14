import { Box } from "@chakra-ui/layout"
import AddTodo from "../components/AddTodo"
import ListTodos from "../components/ListTodos";
import DoneTodos from "../components/DoneTodos";

import { Alert, ChakraProvider } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <ChakraProvider>
      <Box maxWidth="8xl" margin="auto" p={5}>
        <Navigation />
        <AddTodo />
        <ListTodos />
        <DoneTodos />
      </Box>
    </ChakraProvider>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
