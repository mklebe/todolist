import { Input, Button, Flex, Checkbox, Heading, Text, Spacer } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { deleteProductFeature } from '../store/feature-store';

function TodoListItems() {
const store = useStore($store);
return (
  <>
    {store.features.map(( feature ) => (
      <Flex pt={2} key={feature.id}>
        <Text>{feature.title}</Text>
        <Text>Impact: {feature.impact}</Text>
        <Text>Effort: {feature.effort}</Text>
        <Spacer />
        <Button onClick={() => deleteProductFeature(feature.id)}>Delete Feature</Button>
      </Flex>
    ))}
  </>
)
}

function TodoList() {
  return (
    <>
      <Heading>Ye olde Matze stormy beard's treasure map</Heading>
      <TodoListItems />
    </>
  )
};

export default TodoList;