import { Heading } from "@chakra-ui/react"

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
