import dynamic from 'next/dynamic';

import { Container, Heading } from "@chakra-ui/react"
const FeatureAdd = dynamic(() => import('../../components/FeatureAdd'), { ssr: false });
const FeatureList = dynamic(() => import('../../components/FeatureList'), { ssr: false });

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

export async function getServerSideProps() {
  return {
    props: {},
  }
}
