import { Button, Grid, Input } from "@chakra-ui/react";
import { useStore } from "effector-react";
import $bookStore, { addBook, updateBook } from '../store/book-store';

function BookAdd() {
  let bookTitle = '';

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input placeholder='Book title'
        onChange={(evt) => bookTitle = evt.target.value} />
      <Button onClick={() => addBook(bookTitle)}>Add Book</Button>
    </Grid>
  );

}

export default BookAdd;