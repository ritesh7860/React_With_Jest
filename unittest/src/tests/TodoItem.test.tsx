import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../components/TodoItem';

describe('TodoItem', () => {
  const mockProps = {
    id: '1',
    text: 'Test todo',
    completed: false,
    toggleTodo: vi.fn(),
    deleteTodo: vi.fn(),
    editTodo: vi.fn(),
  };

  it('renders the todo item correctly', () => {
    render(<TodoItem {...mockProps} />);
    
    expect(screen.getByTestId('todo-item')).toBeInTheDocument();
    expect(screen.getByTestId('todo-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('todo-text')).toHaveTextContent('Test todo');
    expect(screen.getByTestId('edit-todo-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-todo-button')).toBeInTheDocument();
  });
  
  it('shows completed styling when todo is completed', () => {
    render(<TodoItem {...mockProps} completed={true} />);
    
    const todoText = screen.getByTestId('todo-text');
    expect(todoText).toHaveClass('line-through');
  });
  
  it('calls toggleTodo when checkbox is clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    const checkbox = screen.getByTestId('todo-checkbox');
    await userEvent.click(checkbox);
    
    expect(mockProps.toggleTodo).toHaveBeenCalledWith('1');
  });
  
  it('calls deleteTodo when delete button is clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    const deleteButton = screen.getByTestId('delete-todo-button');
    await userEvent.click(deleteButton);
    
    expect(mockProps.deleteTodo).toHaveBeenCalledWith('1');
  });
  
  it('enters edit mode when edit button is clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    const editButton = screen.getByTestId('edit-todo-button');
    await userEvent.click(editButton);
    
    expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('save-todo-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-edit-button')).toBeInTheDocument();
  });
  
  it('calls editTodo with new text when save button is clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    // Enter edit mode
    const editButton = screen.getByTestId('edit-todo-button');
    await userEvent.click(editButton);
    
    // Change the text
    const input = screen.getByTestId('edit-todo-input');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated todo');
    
    // Save the changes
    const saveButton = screen.getByTestId('save-todo-button');
    await userEvent.click(saveButton);
    
    expect(mockProps.editTodo).toHaveBeenCalledWith('1', 'Updated todo');
  });
  
  it('exits edit mode without changes when cancel button is clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    // Enter edit mode
    const editButton = screen.getByTestId('edit-todo-button');
    await userEvent.click(editButton);
    
    // Change the text
    const input = screen.getByTestId('edit-todo-input');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated todo');
    
    // Cancel the changes
    const cancelButton = screen.getByTestId('cancel-edit-button');
    await userEvent.click(cancelButton);
    
    expect(mockProps.editTodo).not.toHaveBeenCalled();
    expect(screen.getByTestId('todo-text')).toHaveTextContent('Test todo');
  });
});