import { Grid, Input, Button } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { setNewTodo, addTodo } from '../store/todo-store';

export default function AddTodo() {
  const store = useStore($store);
  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input placeholder='New Todo'
        value={store.newTodo}
        onChange={(evt) => setNewTodo(evt.target.value)} />
      <Button onClick={() => addTodo()}>Add Todo</Button>
    </Grid>
  )
}