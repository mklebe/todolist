import dynamic from "next/dynamic";

import { Container } from "@chakra-ui/react"
const TodoAdd = dynamic(() => import("../../components/TodoAdd"), { ssr: false });
const TodosList = dynamic(() => import("../../components/TodoList"), { ssr: false });
const TodosDone = dynamic(() => import("../../components/TodosDone"), { ssr: false });

export default function Todos() {
  return (
    <>
      <Container maxWidth="100%" mb="32px">
        <TodoAdd />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <TodosList />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <TodosDone />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
