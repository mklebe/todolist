import { Input, Button, Grid, Checkbox, Heading, Tag, Spacer, Flex, HStack, Container } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { completeProductFeature, deleteProductFeature } from '../store/feature-store';

function TodoListItems() {
const store = useStore($store);
return (
  <>
    {store.features.map(( feature ) => (
      <Container maxWidth="100%" mb={4}>
        <Flex key={feature.id} justifyContent="space-between">
          <Checkbox isChecked={!!feature.done} onClick={() => completeProductFeature(feature.id)} />
          <Input mx={2} value={feature.title} readOnly/>
          <Button onClick={() => deleteProductFeature(feature.id)}>Delete Feature</Button>
        </Flex>
        <Flex pt={2}>
          <HStack spacing={2}>
            <Tag colorScheme="green">Impact: {feature.impact}</Tag>
            <Tag colorScheme="yellow">Effort: {feature.effort}</Tag>
          </HStack>
        </Flex>
      </Container>
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