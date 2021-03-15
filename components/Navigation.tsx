import { HStack } from "@chakra-ui/react";
import Link from 'next/link';

function Navigation() {
  return (
    <HStack spacing="16px" marginBottom="24px">
      <Link href="/">Home</Link>
      <Link href="/books">Books</Link>
      <Link href="/todos">Todos</Link>
      <Link href="/features">Features</Link>
    </HStack>
  )
}

export default Navigation;