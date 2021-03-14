import { Input, Button, Flex, Checkbox, Heading } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { remove, toggle, update } from '../store/todo-store';

function TodoListItems() {
const store = useStore($store);
return (
  <>
    {store.todos.map(( todo ) => (
      <Flex pt={2} key={todo.id}>
        <Checkbox checked={!!todo.done} onChange={() => toggle(todo.id)}/>
        <Input value={todo.text}
          mx={ 2 }
          onChange={(evt) => update({
            id: todo.id,
            text: evt.target.value,
          })}
        />
        <Button onClick={() => remove(todo.id)}>Delete Todo</Button>
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