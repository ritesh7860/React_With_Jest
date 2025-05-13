import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { Todo } from '../types/todo';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'Todo 1', completed: false, createdAt: new Date() },
    { id: '2', text: 'Todo 2', completed: true, createdAt: new Date() },
  ];
  
  const mockProps = {
    todos: mockTodos,
    toggleTodo: vi.fn(),
    deleteTodo: vi.fn(),
    editTodo: vi.fn(),
  };

  it('renders the todo list with items', () => {
    render(<TodoList {...mockProps} />);
    
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });
  
  it('renders empty state when no todos', () => {
    render(<TodoList {...mockProps} todos={[]} />);
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.getByText('No tasks found')).toBeInTheDocument();
    expect(screen.getByText('Add a new task to get started')).toBeInTheDocument();
  });
  
  it('passes the correct props to TodoItem components', () => {
    render(<TodoList {...mockProps} />);
    
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems[0]).toBeInTheDocument();
    
    const firstTodoText = screen.getByText('Todo 1');
    expect(firstTodoText).toBeInTheDocument();
    expect(firstTodoText).not.toHaveClass('line-through');
    
    const secondTodoText = screen.getByText('Todo 2');
    expect(secondTodoText).toBeInTheDocument();
    expect(secondTodoText).toHaveClass('line-through');
  });
});