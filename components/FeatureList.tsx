import { Input, Button, Checkbox, Heading, Tag, Flex, HStack, Container, Text } from '@chakra-ui/react';
import { useStore } from 'effector-react';

import $store, { completeProductFeature, deleteProductFeature, ProductFeature } from '../store/feature-store';

function OpenFeatureList({openFeatures}: {openFeatures: Array<ProductFeature>}) {
  return (
    <>
      {openFeatures.map(( feature ) => (
        <Container key={feature.id} maxWidth="100%" mb={4}>
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

function CompletedFeatureList({completed}: {completed: Array<ProductFeature>}) {
  return (
    <>
    {completed.map(( feature ) => (
      <Container key={feature.id} maxWidth="100%" mb={4}>
        <Flex key={feature.id} justifyContent="flex-start">
          <Text>{feature.title}</Text>
          <HStack spacing={2} pl={4}>
            <Tag colorScheme="green">Impact: {feature.impact}</Tag>
            <Tag colorScheme="yellow">Effort: {feature.effort}</Tag>
          </HStack>
        </Flex>
      </Container>
    ))}
    </>
  );
}

function TodoList() {
  const store = useStore($store);
  const openFeatures = store.featureList.filter((feature) => !feature.done);
  const completedFeatures = store.featureList.filter((feature) => feature.done);

  const impactDone = completedFeatures.reduce((acc, current) => acc + current.impact, 0);

  return (
    <>
      <Heading>Ye olde Matze stormy beard's treasure map</Heading>
      <OpenFeatureList openFeatures={openFeatures} />
      <Heading>Olde Matze's treasury value: {impactDone}</Heading>
      <CompletedFeatureList completed={completedFeatures} />
    </>
  )
};

export default TodoList;