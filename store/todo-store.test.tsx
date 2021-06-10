import { useStore } from "effector-react";
import {renderHook, act} from '@testing-library/react-hooks'
import $store, { addTodo, remove } from './todo-store';
import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";


describe('todo store', () => {
  it('is possible to add the todo "start testing" and remove it from todo list', async () => {

    render(<TodoList />);

    const button = await screen.findByTestId('asd');
    fireEvent.click(button)
    await screen.findByText('start testing')
    const removeBtn = await screen.findByTestId('remove');
    fireEvent.click(removeBtn);
  });

  it('removes todo', async () => {
    render(<TodoList />);

    const button = await screen.findByTestId('asd');
    fireEvent.click(button)

    const removeBtn = await screen.findByTestId('remove');
    fireEvent.click(removeBtn);
  });
});
