import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useStore } from "effector-react";
import $store from "../store/todo-store";

function ListOfDoneTodos() {
  const store = useStore($store);
  const doneTodos = store.todos.filter((todo) => todo.done)
  return (
    <>
      { doneTodos.map(( todo ) => (
        <Flex pt={ 2 } key={todo.id}>
          <Text>{todo.text}</Text>
        </Flex>
      ))}
    </>
  );
}

function DoneTodos() {
  return (
    <>
      <Heading>List of things you already done</Heading>
      <ListOfDoneTodos />
    </>
  )
}

export default DoneTodos;