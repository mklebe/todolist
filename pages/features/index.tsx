import dynamic from 'next/dynamic';

import { Container, Heading } from "@chakra-ui/react"
const FeatureAdd = dynamic(() => import('../../components/FeatureAdd'), { ssr: true });
const FeatureList = dynamic(() => import('../../components/FeatureList'), { ssr: true });

export default function Features() {
  return (
    <>
      <Container maxWidth="100%" mb="32px">
        <FeatureAdd />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <FeatureList />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
