import { createDomain } from 'effector';

const todoList = createDomain('todoList');

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const setNewTodo = todoList.createEvent<string>();
export const addTodo = todoList.createEvent();
export const toggle = todoList.createEvent<number>();
export const remove = todoList.createEvent<number>();
export const update = todoList.createEvent<{ id: number, text: string }>();

const todoStore = todoList.createStore<Store>({
  todos: [],
  newTodo: '',
}, {
  name: 'status',
})

const removeTodo = (todos: Todo[], id: number): Todo[] => todos.filter((todo) => {
  return todo.id !== id
});

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

export const getTodos = todoList.createEffect(async (url: string) => {
  const req = await fetch(url);
  const todos = await req.json() as Todo[];
  return todos
});


type Store = {
  todos: Todo[];
  newTodo: string;
}


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