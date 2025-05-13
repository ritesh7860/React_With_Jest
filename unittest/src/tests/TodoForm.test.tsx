import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../components/TodoForm';

describe('TodoForm', () => {
  it('renders the form correctly', () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    expect(screen.getByTestId('todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
  });
  
  it('handles input change', async () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New todo');
    
    expect(input).toHaveValue('New todo');
  });
  
  it('submits the form with valid input', async () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New todo');
    
    const button = screen.getByTestId('add-todo-button');
    await userEvent.click(button);
    
    expect(addTodo).toHaveBeenCalledWith('New todo');
    expect(input).toHaveValue('');
  });
  
  it('does not submit with empty input', async () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    const button = screen.getByTestId('add-todo-button');
    await userEvent.click(button);
    
    expect(addTodo).not.toHaveBeenCalled();
  });
  
  it('does not submit with whitespace-only input', async () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, '   ');
    
    const button = screen.getByTestId('add-todo-button');
    await userEvent.click(button);
    
    expect(addTodo).not.toHaveBeenCalled();
  });
  
  it('submits on Enter key press', async () => {
    const addTodo = vi.fn();
    render(<TodoForm addTodo={addTodo} />);
    
    const input = screen.getByTestId('todo-input');
    await userEvent.type(input, 'New todo{enter}');
    
    expect(addTodo).toHaveBeenCalledWith('New todo');
    expect(input).toHaveValue('');
  });
});