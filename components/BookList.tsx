import { Button, Checkbox, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useEffect } from "react";
import $bookStore, { Book, deleteBook, toggleFinishReading, toggleStartReading } from '../store/book-store';

interface SublistProps {
  headline: string;
  books: Book[];
  totalCount: number;
}

function Sublist({headline, books, totalCount}: SublistProps) {
  return (
    <Container maxWidth="100%" mb="32px">
      <Heading mb="16px" size="md">{headline} ({books.length} / {totalCount})</Heading>
      {books.map((book) => (
        <Flex mb="16px" key={book.id}>
          <Checkbox
            onChange={() => toggleFinishReading(book.id)}
            marginRight="16px"
            noOfLines={1}
            isChecked={!!book.isFinished}
          >Is finished</Checkbox>
          <Checkbox
            onChange={() => toggleStartReading(book.id)}
            marginRight="16px"
            noOfLines={1}
            isChecked={!!book.isStarted}
          >Is started</Checkbox>
          <Text 
            fontSize="sm"
            noOfLines={1}
          >{book.title}</Text>
          <Spacer />
          <Button onClick={() => deleteBook(book.id)}>Delete book</Button>
        </Flex>
      ))}
    </Container>)
}

function BookList() {
  const store = useStore($bookStore);
  const untouchedBooks: Book[] = store.books.filter((book) => !book.isStarted && !book.isFinished);
  const currentReadings: Book[] = store.books.filter((book) => book.isStarted && !book.isFinished);
  const finishedReadings: Book[] = store.books.filter((book) => book.isFinished);

  return (
    <>
      <Heading mb="16px">Booklist contains {store.books.length} items</Heading>
      <Sublist headline="Untouched Books" books={untouchedBooks} totalCount={store.books.length}/>
      <Sublist headline="Current readings" books={currentReadings} totalCount={store.books.length}/>
      <Sublist headline="Finished readings" books={finishedReadings} totalCount={store.books.length}/>
    </>
  );
}

export default BookList;