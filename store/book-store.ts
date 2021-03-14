import { createDomain, createEvent, createStore, Domain } from "effector"

const bookShelf = createDomain('bookshelf');

function saveToStorage(domain: Domain, storage) {
  return domain.onCreateStore(store => {
    const key = `${domain.shortName}/${store.shortName}`
    store.watch(value => {
      storage.setItem(
        key,
        JSON.stringify(value),
      )
    })
  })
}

function loadFromStorage(domain: Domain, storage) {
  return domain.onCreateStore(store => {
    const key = `${domain.shortName}/${store.shortName}`
    const raw = storage.getItem(key)
    console.log(raw);
    if (!raw) return
    const parsed = JSON.parse(raw)
    store.setState(parsed)
  })
}


export const addBook = bookShelf.createEvent<string>();
export const updateBook = bookShelf.createEvent<{id: number, title: string}>()
export const toggleStartReading = bookShelf.createEvent<number>();
export const toggleFinishReading = bookShelf.createEvent<number>();
export const deleteBook = bookShelf.createEvent<number>();



const library = bookShelf.createStore<BookStore>({
  books: [],
  newBook: '',
}, {
  name: 'status'
});

loadFromStorage(bookShelf, localStorage);
saveToStorage(bookShelf, localStorage);


export interface Book {
  id: number;
  title: string;
  isStarted: boolean;
  isFinished: boolean;
}

const addToLibrary = (books: Book[], title: string): Book[] => [
  ...books,
  {
    id: Math.max(0, Math.max(...books.map(({ id }) => id))) + 1,
    title,
    isFinished: false,
    isStarted: false,
  }
]

const deleteFromLibrary = (books: Book[], id: number): Book[] => books.filter((book) => book.id !== id);

const updateTitle = (books: Book[], id: number, title: string): Book[] =>
  books.map((book) => ({
    ...book,
    title: book.id === id ? title : book.title,
  }));

const toggleStart = (books: Book[], id: number): Book[] =>
  books.map((book) => ({
    ...book,
    isStarted: book.id === id ? !book.isStarted : book.isStarted,
  }));

const toggleFinished = (books: Book[], id: number): Book[] =>
  books.map((book) => ({
    ...book,
    isFinished: book.id === id ? !book.isFinished : book.isFinished,
  }));

type BookStore = {
  books: Book[];
  newBook: string;
}

export default library
  .on(toggleStartReading, (state, id) => ({
    ...state,
    books: toggleStart(state.books, id),
  }))
  .on(deleteBook, (state, id) => ({
    ...state,
    books: deleteFromLibrary(state.books, id),
  }))
  .on(toggleFinishReading, (state, id) => ({
    ...state,
    books: toggleFinished(state.books, id),
  }))
  .on(addBook, (state, title) => ({
    ...state,
    books: addToLibrary(state.books, title),
  }))
  .on(updateBook, (state, {id, title}) => ({
    ...state,
    books: updateTitle(state.books, id, title),
  }));
