import dynamic from "next/dynamic";

import { Box } from "@chakra-ui/layout"
const AddTodo = dynamic( () => import("../../components/AddTodo"), {ssr: false});
const ListTodos = dynamic( () => import("../../components/ListTodos"), {ssr: false});
const DoneTodos = dynamic(() => import("../../components/DoneTodos"), {ssr: false});

import { Alert, ChakraProvider } from "@chakra-ui/react";
import Navigation from "../../components/Navigation";

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
