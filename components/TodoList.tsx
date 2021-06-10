import { Input, Button, Flex, Checkbox, Heading, Text } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { addTodo, remove, toggle, update } from '../store/todo-store';

function TodoListItems() {
  const store = useStore($store);
  store.newTodo = 'start testing';

  return (
    <>
      <Button data-testid="asd" onClick={() => {addTodo()}}></Button>
      {store.todos.map(( todo ) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox isChecked={!!todo.done} onChange={() => toggle(todo.id)}/>
          <Text margin={4}>{todo.text}</Text>
          <Button data-testid="remove" onClick={() => remove(todo.id)}>Delete Todo</Button>
        </Flex>
      ))}
    </>
  )
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  )
};

export default TodoList;