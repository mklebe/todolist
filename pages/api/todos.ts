import { Todo } from "../../store/todo-store"

const todoList: Todo[] = [
  {
    id: 0,
    text: 'Get up!',
    done: true,
  },
  {
    id: 1,
    text: 'Tidy your bed',
    done: false,
  },
  {
    id: 2,
    text: 'Have a wonderful breakfast',
    done: false,
  }
]

export default (req, res) => {
  res.status(200).json(todoList);
}
