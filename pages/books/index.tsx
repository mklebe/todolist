import dynamic from 'next/dynamic';

import { Container } from "@chakra-ui/react"

const BookAdd = dynamic(() => import("../../components/BookAdd"), { ssr: false });
const BookList = dynamic(() => import("../../components/BookList"), { ssr: false });

export default function Home() {
  return (
    <>
      <Container maxWidth="100%" mb="32px">
        <BookAdd />
      </Container>
      <Container maxWidth="100%" mb="32px">
        <BookList />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
