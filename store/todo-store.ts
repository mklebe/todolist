import { createEvent, createStore, createEffect } from 'effector';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const removeTodo = (todos: Todo[], id: number): Todo[] => todos.filter((todo) => todo.id !== id);

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done
  }))

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const addTodoToList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  }
];

export const getTodos = createEffect(async (url: string) => {
  const req = await fetch(url);
  const todos = await req.json() as Todo[];
  return todos
});

export const setNewTodo = createEvent<string>();
export const addTodo = createEvent();
export const toggle = createEvent<number>();
export const remove = createEvent<number>();
export const update = createEvent<{ id: number, text: string }>();

type Store = {
  todos: Todo[];
  newTodo: string;
}

const todoStore = createStore<Store>({
  todos: [],
  newTodo: '',
})

export default todoStore
  .on(getTodos.doneData, (state, todos) => ({
    ...state,
    todos,
  }))
  .on(setNewTodo, (state, newTodo) => ({
    ...state,
    newTodo,
  })).on(addTodo, (state) => ({
    ...state,
    newTodo: '',
    todos: addTodoToList(state.todos, state.newTodo),
  })).on(toggle, (state, id) => ({
    ...state,
    newTodo: '',
    todos: toggleTodo(state.todos, id),
  })).on(update, (state, { id, text }) => ({
    ...state,
    todos: updateTodo(state.todos, id, text),
  })).on(remove, (state, id) => ({
    ...state,
    todos: removeTodo(state.todos, id),
  }));