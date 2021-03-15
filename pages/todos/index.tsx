import dynamic from "next/dynamic";

import { Container } from "@chakra-ui/react"
const AddTodo = dynamic( () => import("../../components/AddTodo"), {ssr: false});
const ListTodos = dynamic( () => import("../../components/ListTodos"), {ssr: false});
const DoneTodos = dynamic(() => import("../../components/DoneTodos"), {ssr: false});

export default function Todos() {
  return (
    <>
      <Container maxWidth="100%" mb="32px">
        <AddTodo />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <ListTodos />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <DoneTodos />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
