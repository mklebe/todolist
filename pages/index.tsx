import { Box, Heading, Container } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <>
      <Heading>Hello World</Heading>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
